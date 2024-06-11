import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';

import { TestInstanceLearner, TestInstanceLearnerUpdateProps } from './entities/test-instance-learner.entity';

export class TestInstanceLearnerServiceError extends Error {}

export class TestInstanceLearnerServiceCreateError extends TestInstanceLearnerServiceError {}

export class TestInstanceLearnerServiceCreateDuplicateError extends TestInstanceLearnerServiceCreateError {}

export class TestInstanceLearnerServiceUpdateError extends TestInstanceLearnerServiceError {}

export class TestInstanceLearnerServiceUpdateDuplicateError extends TestInstanceLearnerServiceUpdateError {}

@Injectable()
export class TestInstanceLearnerService {
  public constructor(
    @InjectRepository(TestInstanceLearner)
    private readonly testInstanceLearnerRepository: Repository<TestInstanceLearner>,
  ) {}

  public async create(testInstanceLearner: TestInstanceLearner): Promise<TestInstanceLearner> {
    const existingInstanceLearners = await this.testInstanceLearnerRepository.findBy([
      { instanceId: testInstanceLearner.instance.id, learnerId: testInstanceLearner.learner.id },
      { instanceId: testInstanceLearner.instance.id, learnerNumber: testInstanceLearner.learnerNumber },
    ]);
    if (existingInstanceLearners.length) {
      throw new TestInstanceLearnerServiceCreateDuplicateError('Instance learner with such parameters already exists');
    }

    return this.testInstanceLearnerRepository.save(testInstanceLearner);
  }

  public async findAll(findAllOptions?: FindOptionsWhere<TestInstanceLearner>): Promise<TestInstanceLearner[]> {
    return this.testInstanceLearnerRepository.find({
      where: findAllOptions,
      order: { createdAt: 'ASC' },
      loadRelationIds: true,
    });
  }

  public async find(findOptions: FindOptionsWhere<TestInstanceLearner>): Promise<TestInstanceLearner | null> {
    return this.testInstanceLearnerRepository.findOne({
      where: findOptions,
      relations: { instance: true, answers: true, learner: true },
    });
  }

  public async get(instanceId: string, learnerId: string): Promise<TestInstanceLearner | null> {
    return this.testInstanceLearnerRepository.findOne({
      where: { instanceId, learnerId },
      relations: { instance: true, answers: true, learner: true },
    });
  }

  public async update(
    testInstanceLearner: TestInstanceLearner,
    props: TestInstanceLearnerUpdateProps,
  ): Promise<TestInstanceLearner> {
    const existingInstanceLearners = await this.testInstanceLearnerRepository.findBy([
      {
        instanceId: props.instance?.id || testInstanceLearner.instance.id,
        learnerId: props.learner?.id || testInstanceLearner.learner.id,
      },
      {
        instanceId: props.instance?.id || testInstanceLearner.instance.id,
        learnerNumber: props.learnerNumber || testInstanceLearner.learnerNumber,
      },
    ]);

    if (
      existingInstanceLearners.length &&
      existingInstanceLearners.find(
        (_instanceLearner) =>
          _instanceLearner.instanceId !== testInstanceLearner.instanceId ||
          _instanceLearner.learnerId !== testInstanceLearner.learnerId,
      )
    ) {
      throw new TestInstanceLearnerServiceUpdateDuplicateError('Instance learner with such parameters already exists');
    }

    testInstanceLearner.update(props);

    return this.testInstanceLearnerRepository.save(testInstanceLearner);
  }

  public async remove(testInstanceLearner: TestInstanceLearner): Promise<void> {
    await this.testInstanceLearnerRepository.remove(testInstanceLearner);
  }
}
