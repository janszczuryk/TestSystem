import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  ForbiddenException,
  Get,
  HttpCode,
  NotFoundException,
  Post,
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common';

import { AccountService } from '@module/account/account.service';
import { AccountType } from '@module/account/entities/account.entity';
import { JwtParams } from '@module/auth/auth.type';
import { AccountTypes, AuthJwt } from '@module/auth/decorators';
import { AccountTypeGuard, JwtAuthGuard } from '@module/auth/guards';
import { ParamUUID } from '@module/common/decorators';
import { TestInstanceService } from '@module/test-instance/test-instance.service';
import { TestInstanceLearner } from '@module/test-instance-learner/entities/test-instance-learner.entity';
import {
  TestInstanceLearnerService,
  TestInstanceLearnerServiceCreateDuplicateError,
} from '@module/test-instance-learner/test-instance-learner.service';
import { TestInstanceLearnerAnswer } from '@module/test-instance-learner-answer/entities/test-instance-learner-answer.entity';
import { TestInstanceLearnerAnswerService } from '@module/test-instance-learner-answer/test-instance-learner-answer.service';
import { TestInstanceQuestionService } from '@module/test-instance-question/test-instance-question.service';

import { AnswerTestInstanceBodyDto, JoinTestInstanceBodyDto } from './dto/body';
import {
  TestInstanceLearnerAnswerResponseDto,
  TestInstanceLearnerResponseDto,
  TestInstanceResponseDto,
} from './dto/response';

@Controller('learner')
@UseGuards(JwtAuthGuard, AccountTypeGuard)
@AccountTypes([AccountType.LEARNER])
export class LearnerController {
  public constructor(
    private readonly accountService: AccountService,
    private readonly testInstanceService: TestInstanceService,
    private readonly testInstanceQuestionService: TestInstanceQuestionService,
    private readonly testInstanceLearnerService: TestInstanceLearnerService,
    private readonly testInstanceLearnerAnswerService: TestInstanceLearnerAnswerService,
  ) {}

  @Get('instances')
  public async findAllInstances() {
    const testInstances = await this.testInstanceService.findAllForLearner();

    return testInstances.map((testInstance) => new TestInstanceResponseDto(testInstance));
  }

  @Get('instances/:instance_id')
  public async findOneInstance(
    @ParamUUID('instance_id') instanceId: string,
    @AuthJwt() { accountId: learnerId }: JwtParams,
  ) {
    const testInstance = await this.testInstanceService.getForLearner(instanceId);
    if (!testInstance) {
      throw new NotFoundException('Instance does not exist');
    }
    if (!testInstance.isEnabled) {
      throw new ForbiddenException('Instance is not enabled');
    }

    const testInstanceLearner = await this.testInstanceLearnerService.get(instanceId, learnerId);

    return new TestInstanceResponseDto(Object.assign(testInstance, { learner: testInstanceLearner ?? undefined }));
  }

  @Post('instances/:instance_id/join')
  @HttpCode(200)
  public async joinInstance(
    @ParamUUID('instance_id') instanceId: string,
    @Body() body: JoinTestInstanceBodyDto,
    @AuthJwt() { accountId: learnerId }: JwtParams,
  ) {
    const testInstance = await this.testInstanceService.getForLearner(instanceId);
    if (!testInstance) {
      throw new NotFoundException('Instance does not exist');
    }
    if (!testInstance.isEnabled) {
      throw new ForbiddenException('Instance is not enabled');
    }

    const learner = await this.accountService.get(learnerId, AccountType.LEARNER);
    if (!learner) {
      throw new Error('Learner account does not exist');
    }

    const existingTestInstanceLearner = await this.testInstanceLearnerService.get(instanceId, learnerId);
    if (existingTestInstanceLearner) {
      throw new ConflictException('Learner already joined to the instance');
    }

    let testInstanceLearner = TestInstanceLearner.create({
      instance: testInstance,
      learner: learner,
      learnerNumber: body.learnerNumber,
    });

    try {
      testInstanceLearner = await this.testInstanceLearnerService.create(testInstanceLearner);
    } catch (error) {
      if (error instanceof TestInstanceLearnerServiceCreateDuplicateError) {
        throw new ConflictException(error.message);
      }

      throw error;
    }

    return new TestInstanceLearnerResponseDto(testInstanceLearner);
  }

  @Post('instances/:instance_id/start')
  @HttpCode(200)
  public async startInstanceLearner(
    @ParamUUID('instance_id') instanceId: string,
    @AuthJwt() { accountId: learnerId }: JwtParams,
  ) {
    let testInstanceLearner = await this.testInstanceLearnerService.get(instanceId, learnerId);
    if (!testInstanceLearner) {
      throw new NotFoundException('Learner instance does not exist');
    }
    if (!testInstanceLearner.isJoined()) {
      throw new ConflictException('Learner instance must be joined status');
    }

    testInstanceLearner = await this.testInstanceLearnerService.start(testInstanceLearner);

    return new TestInstanceLearnerResponseDto(testInstanceLearner);
  }

  @Post('instances/:instance_id/finish')
  @HttpCode(200)
  public async finishInstanceLearner(
    @ParamUUID('instance_id') instanceId: string,
    @AuthJwt() { accountId: learnerId }: JwtParams,
  ) {
    let testInstanceLearner = await this.testInstanceLearnerService.get(instanceId, learnerId);
    if (!testInstanceLearner) {
      throw new NotFoundException('Learner instance does not exist');
    }
    if (!testInstanceLearner.isStarted()) {
      throw new ConflictException('Learner instance must be started status');
    }

    testInstanceLearner = await this.testInstanceLearnerService.finish(testInstanceLearner);

    return new TestInstanceLearnerResponseDto(testInstanceLearner);
  }

  @Get('instances/:instance_id/question')
  public async getInstanceQuestion(
    @ParamUUID('instance_id') instanceId: string,
    @AuthJwt() { accountId: learnerId }: JwtParams,
  ) {
    const testInstanceLearner = await this.testInstanceLearnerService.get(instanceId, learnerId);
    if (!testInstanceLearner) {
      throw new NotFoundException('Learner instance does not exist');
    }
    if (!testInstanceLearner.isStarted()) {
      throw new ConflictException('Learner instance must be started status');
    }

    const testInstance = testInstanceLearner.instance;
    if (!testInstance.isStarted()) {
      throw new ConflictException('Instance must be started status');
    }

    const pendingLearnerAnswer = await this.testInstanceLearnerAnswerService.getPending(testInstanceLearner);
    if (pendingLearnerAnswer) {
      return new TestInstanceLearnerAnswerResponseDto(pendingLearnerAnswer);
    }

    const currentLearnerAnswers = await this.testInstanceLearnerAnswerService.findAll({
      instanceLearner: testInstanceLearner,
    });
    if (currentLearnerAnswers.length === testInstance.questionsCount) {
      throw new UnprocessableEntityException('Learner already answered all questions');
    }

    const excludeInstanceQuestionsIds = currentLearnerAnswers.map((learnerAnswer) => learnerAnswer.id);
    const randomInstanceQuestion = await this.testInstanceQuestionService.findRandomized(
      instanceId,
      excludeInstanceQuestionsIds,
    );

    if (!randomInstanceQuestion) {
      throw new Error('Cannot randomize next question');
    }

    let learnerAnswer = TestInstanceLearnerAnswer.create({
      instanceLearner: testInstanceLearner,
      instanceQuestion: randomInstanceQuestion,
    });
    learnerAnswer.show();
    learnerAnswer = await this.testInstanceLearnerAnswerService.create(learnerAnswer);

    return new TestInstanceLearnerAnswerResponseDto(learnerAnswer);
  }

  @Post('instances/:instance_id/answer')
  @HttpCode(204)
  public async answerInstanceQuestion(
    @ParamUUID('instance_id') instanceId: string,
    @Body() body: AnswerTestInstanceBodyDto,
    @AuthJwt() { accountId: learnerId }: JwtParams,
  ) {
    const testInstanceLearner = await this.testInstanceLearnerService.get(instanceId, learnerId);
    if (!testInstanceLearner) {
      throw new NotFoundException('Learner instance does not exist');
    }

    const pendingLearnerAnswer = await this.testInstanceLearnerAnswerService.getPending(testInstanceLearner);
    if (!pendingLearnerAnswer) {
      throw new NotFoundException('No pending question to be answered');
    }

    if (!testInstanceLearner.isStarted()) {
      throw new ConflictException('Learner instance must be started status');
    }

    const possibleAnswersCount = pendingLearnerAnswer.instanceQuestion.answers.length;
    if (body.answerIndex > possibleAnswersCount - 1) {
      throw new BadRequestException('Answer index is invalid');
    }

    await this.testInstanceLearnerAnswerService.submitAnswer(pendingLearnerAnswer, body.answerIndex);
  }
}
