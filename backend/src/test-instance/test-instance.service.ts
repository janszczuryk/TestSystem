import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';

import { TestInstanceQuestion } from '@module/test-instance-question/entities/test-instance-question.entity';
import { TestInstanceQuestionService } from '@module/test-instance-question/test-instance-question.service';
import { TestSchemaQuestionService } from '@module/test-schema-question/test-schema-question.service';

import { TestInstance, TestInstanceUpdateProps } from './entities/test-instance.entity';

export class TestInstanceServiceError extends Error {}

export class TestInstanceServiceCreateError extends TestInstanceServiceError {}

export class TestInstanceServiceRandomizeQuestionsCreateError extends TestInstanceServiceCreateError {}

export class TestInstanceServiceUpdateError extends TestInstanceServiceError {}

export class TestInstanceServiceRandomizeQuestionsUpdateError extends TestInstanceServiceUpdateError {}

@Injectable()
export class TestInstanceService {
  public constructor(
    @InjectRepository(TestInstance)
    private readonly testInstanceRepository: Repository<TestInstance>,
    private readonly testSchemaQuestionService: TestSchemaQuestionService,
    private readonly testInstanceQuestionService: TestInstanceQuestionService,
  ) {}

  public async create(testInstance: TestInstance): Promise<TestInstance> {
    if (!testInstance.schema) {
      throw new TestInstanceServiceCreateError('Schema must be defined');
    }

    const schemaQuestions = await this.testSchemaQuestionService.findAllRandomized(
      testInstance.schema,
      testInstance.questionsCount,
    );
    if (schemaQuestions.length !== testInstance.questionsCount) {
      throw new TestInstanceServiceRandomizeQuestionsCreateError('Cannot randomize proper questions count');
    }

    testInstance = await this.testInstanceRepository.save(testInstance);

    const testInstanceQuestions = schemaQuestions.map((schemaQuestion) =>
      TestInstanceQuestion.create({
        answers: schemaQuestion.answers,
        correctAnswerIndex: schemaQuestion.correctAnswerIndex,
        instance: testInstance,
        question: schemaQuestion.question,
        schemaQuestion: schemaQuestion,
      }),
    );
    testInstance.questionsPool = await this.testInstanceQuestionService.createMany(testInstanceQuestions);

    return testInstance;
  }

  public async findAll(findAllOptions?: FindOptionsWhere<TestInstance>): Promise<TestInstance[]> {
    return this.testInstanceRepository.find({
      where: findAllOptions,
      loadRelationIds: true,
    });
  }

  public async find(findOptions: FindOptionsWhere<TestInstance>): Promise<TestInstance | null> {
    return this.testInstanceRepository.findOne({
      where: findOptions,
      relations: { schema: true, questionsPool: true, teacher: true, results: true },
    });
  }

  public async get(id: string): Promise<TestInstance | null> {
    return this.testInstanceRepository.findOne({
      where: { id },
      relations: { schema: true, questionsPool: true, teacher: true, results: true },
    });
  }

  public async update(testInstance: TestInstance, props: TestInstanceUpdateProps): Promise<TestInstance> {
    testInstance.update(props);

    if (props.questionsCount) {
      if (!testInstance.schema) {
        throw new TestInstanceServiceCreateError('Schema must be defined');
      }

      const newSchemaQuestions = await this.testSchemaQuestionService.findAllRandomized(
        testInstance.schema,
        testInstance.questionsCount,
      );
      if (newSchemaQuestions.length !== testInstance.questionsCount) {
        throw new TestInstanceServiceRandomizeQuestionsUpdateError('Cannot randomize proper questions count');
      }

      if (!testInstance.questionsPool) {
        throw new Error('Questions pool relation needs to be loaded');
      }

      await this.testInstanceQuestionService.removeMany(testInstance.questionsPool);

      const newTestInstanceQuestions = newSchemaQuestions.map((newSchemaQuestion) =>
        TestInstanceQuestion.create({
          answers: newSchemaQuestion.answers,
          correctAnswerIndex: newSchemaQuestion.correctAnswerIndex,
          instance: testInstance,
          question: newSchemaQuestion.question,
          schemaQuestion: newSchemaQuestion,
        }),
      );
      testInstance.questionsPool = await this.testInstanceQuestionService.createMany(newTestInstanceQuestions);
    }

    return this.testInstanceRepository.save(testInstance);
  }

  public async remove(testInstance: TestInstance): Promise<void> {
    await this.testInstanceRepository.remove(testInstance);
  }

  public async start(testInstance: TestInstance): Promise<TestInstance> {
    testInstance.start();

    return this.testInstanceRepository.save(testInstance);
  }

  public async end(testInstance: TestInstance): Promise<TestInstance> {
    testInstance.end();

    return this.testInstanceRepository.save(testInstance);
  }
}
