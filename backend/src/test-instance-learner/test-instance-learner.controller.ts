import {
  Body,
  ConflictException,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  NotFoundException,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { AccountService } from '@module/account/account.service';
import { AccountType } from '@module/account/entities/account.entity';
import { JwtParams } from '@module/auth/auth.type';
import { AccountTypes, AuthJwt } from '@module/auth/decorators';
import { AccountTypeGuard, JwtAuthGuard } from '@module/auth/guards';
import { ParamUUID } from '@module/common/decorators';
import { TestInstanceService } from '@module/test-instance/test-instance.service';

import { CreateTestInstanceLearnerBodyDto, UpdateTestInstanceLearnerBodyDto } from './dto/body';
import { TestInstanceLearnerResponseDto } from './dto/response';
import { TestInstanceLearner } from './entities/test-instance-learner.entity';
import {
  TestInstanceLearnerService,
  TestInstanceLearnerServiceCreateDuplicateError,
  TestInstanceLearnerServiceUpdateDuplicateError,
} from './test-instance-learner.service';

@Controller('instances/:instance_id/learners')
@UseGuards(JwtAuthGuard, AccountTypeGuard)
@AccountTypes([AccountType.TEACHER])
export class TestInstanceLearnerController {
  public constructor(
    private readonly testInstanceLearnerService: TestInstanceLearnerService,
    private readonly testInstanceService: TestInstanceService,
    private readonly accountService: AccountService,
  ) {}

  @Post()
  public async create(
    @ParamUUID('instance_id') instanceId: string,
    @Body() body: CreateTestInstanceLearnerBodyDto,
    @AuthJwt() { accountId }: JwtParams,
  ) {
    const testInstance = await this.testInstanceService.get(instanceId);
    if (!testInstance) {
      throw new NotFoundException('Instance does not exist');
    }

    const learner = await this.accountService.get(body.learnerId, AccountType.LEARNER);
    if (!learner) {
      throw new NotFoundException('Learner account does not exist');
    }

    const teacher = await this.accountService.get(accountId, AccountType.TEACHER);
    if (!teacher) {
      throw new Error('Teacher account does not exist');
    }
    if (!teacher.isVerified) {
      throw new ForbiddenException('Teacher account is not verified');
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

  @Get()
  public async findAll(@ParamUUID('instance_id') instanceId: string) {
    const testInstance = await this.testInstanceService.get(instanceId);
    if (!testInstance) {
      throw new NotFoundException('Instance does not exist');
    }

    const testInstanceLearners = await this.testInstanceLearnerService.findAll({
      instanceId,
    });

    return testInstanceLearners.map((testInstanceLearner) => new TestInstanceLearnerResponseDto(testInstanceLearner));
  }

  @Get(':learner_id')
  public async findOne(@ParamUUID('learner_id') learnerId: string, @ParamUUID('instance_id') instanceId: string) {
    const testInstanceLearner = await this.testInstanceLearnerService.get(instanceId, learnerId);
    if (!testInstanceLearner) {
      throw new NotFoundException('Instance learner does not exist');
    }

    return new TestInstanceLearnerResponseDto(testInstanceLearner);
  }

  @Patch(':learner_id')
  public async update(
    @ParamUUID('learner_id') learnerId: string,
    @ParamUUID('instance_id') instanceId: string,
    @Body() body: UpdateTestInstanceLearnerBodyDto,
    @AuthJwt() { accountId }: JwtParams,
  ) {
    let testInstanceLearner = await this.testInstanceLearnerService.get(instanceId, learnerId);
    if (!testInstanceLearner) {
      throw new NotFoundException('Instance learner does not exist');
    }

    const teacher = await this.accountService.get(accountId, AccountType.TEACHER);
    if (!teacher) {
      throw new Error('Teacher account does not exist');
    }
    if (!teacher.isVerified) {
      throw new ForbiddenException('Teacher account is not verified');
    }

    try {
      testInstanceLearner = await this.testInstanceLearnerService.update(testInstanceLearner, {
        learnerNumber: body.learnerNumber,
      });
    } catch (error) {
      if (error instanceof TestInstanceLearnerServiceUpdateDuplicateError) {
        throw new ConflictException(error.message);
      }

      throw error;
    }

    return testInstanceLearner;
  }

  @Delete(':learner_id')
  @HttpCode(204)
  public async remove(
    @ParamUUID('learner_id') learnerId: string,
    @ParamUUID('instance_id') instanceId: string,
    @AuthJwt() { accountId }: JwtParams,
  ) {
    const testInstanceLearner = await this.testInstanceLearnerService.get(instanceId, learnerId);
    if (!testInstanceLearner) {
      throw new NotFoundException('Instance learner does not exist');
    }

    const teacher = await this.accountService.get(accountId, AccountType.TEACHER);
    if (!teacher) {
      throw new Error('Teacher account does not exist');
    }
    if (!teacher.isVerified) {
      throw new ForbiddenException('Teacher account is not verified');
    }

    await this.testInstanceLearnerService.remove(testInstanceLearner);
  }
}
