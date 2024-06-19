import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, In, Repository } from 'typeorm';

import { TestInstanceLearner } from '@module/test-instance-learner/entities/test-instance-learner.entity';

import {
  TestInstanceLearnerAnswer,
  TestInstanceLearnerAnswerStatus,
} from './entities/test-instance-learner-answer.entity';

@Injectable()
export class TestInstanceLearnerAnswerService {
  public constructor(
    @InjectRepository(TestInstanceLearnerAnswer)
    private readonly testInstanceLearnerAnswerRepository: Repository<TestInstanceLearnerAnswer>,
  ) {}

  public async create(testInstanceLearnerAnswer: TestInstanceLearnerAnswer): Promise<TestInstanceLearnerAnswer> {
    const learnerAnswersCount = await this.testInstanceLearnerAnswerRepository.countBy({
      instanceLearner: testInstanceLearnerAnswer.instanceLearner,
    });

    testInstanceLearnerAnswer.questionNumber = learnerAnswersCount + 1;

    return this.testInstanceLearnerAnswerRepository.save(testInstanceLearnerAnswer);
  }

  public async getPending(testInstanceLearner: TestInstanceLearner): Promise<TestInstanceLearnerAnswer | null> {
    return this.testInstanceLearnerAnswerRepository.findOne({
      where: {
        instanceLearner: { instanceId: testInstanceLearner.instanceId, learnerId: testInstanceLearner.learnerId },
        status: In([TestInstanceLearnerAnswerStatus.CREATED, TestInstanceLearnerAnswerStatus.SHOWN]),
      },
      relations: { instanceQuestion: true },
    });
  }

  public async findAll(
    findAllOptions?: FindOptionsWhere<TestInstanceLearnerAnswer>,
  ): Promise<TestInstanceLearnerAnswer[]> {
    return this.testInstanceLearnerAnswerRepository.find({
      where: findAllOptions,
      loadRelationIds: true,
      order: { createdAt: 'ASC' },
    });
  }

  public async submitAnswer(
    testInstanceLearnerAnswer: TestInstanceLearnerAnswer,
    submittedAnswerIndex: number,
  ): Promise<TestInstanceLearnerAnswer> {
    if (!testInstanceLearnerAnswer.instanceQuestion) {
      throw new Error('Instance question must be defined');
    }

    const correctAnswerIndex = testInstanceLearnerAnswer.instanceQuestion.correctAnswerIndex;

    testInstanceLearnerAnswer.submitAnswer(correctAnswerIndex, submittedAnswerIndex);

    return this.testInstanceLearnerAnswerRepository.save(testInstanceLearnerAnswer);
  }
}
