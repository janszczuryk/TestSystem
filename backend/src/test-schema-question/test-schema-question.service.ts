import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';

import { randomUUID } from 'crypto';

import {
  TestSchemaQuestion,
  TestSchemaQuestionCreateProps,
  TestSchemaQuestionUpdateProps,
} from './entities/test-schema-question.entity';

@Injectable()
export class TestSchemaQuestionService {
  public constructor(
    @InjectRepository(TestSchemaQuestion)
    private readonly testSchemaQuestionRepository: Repository<TestSchemaQuestion>,
  ) {}

  public async create(props: TestSchemaQuestionCreateProps): Promise<TestSchemaQuestion> {
    const now = new Date();

    const subject = this.testSchemaQuestionRepository.create({
      id: randomUUID(),
      ...props,
      instanceQuestions: [],
      updatedAt: now,
      createdAt: now,
    });

    return this.testSchemaQuestionRepository.save(subject);
  }

  public async findAll(findAllOptions?: FindOptionsWhere<TestSchemaQuestion>): Promise<TestSchemaQuestion[]> {
    return this.testSchemaQuestionRepository.find({
      where: findAllOptions,
      loadRelationIds: true,
    });
  }

  public async find(findOptions: FindOptionsWhere<TestSchemaQuestion>): Promise<TestSchemaQuestion | null> {
    return this.testSchemaQuestionRepository.findOne({
      where: findOptions,
      relations: { schema: true, instanceQuestions: true },
    });
  }

  public async get(id: string): Promise<TestSchemaQuestion | null> {
    return this.testSchemaQuestionRepository.findOne({
      where: { id },
      relations: { schema: true, instanceQuestions: true },
    });
  }

  public async update(
    testSchemaQuestion: TestSchemaQuestion,
    props: TestSchemaQuestionUpdateProps,
  ): Promise<TestSchemaQuestion> {
    testSchemaQuestion.update(props);

    return this.testSchemaQuestionRepository.save(testSchemaQuestion);
  }

  public async remove(testSchemaQuestion: TestSchemaQuestion): Promise<void> {
    await this.testSchemaQuestionRepository.remove(testSchemaQuestion);
  }
}
