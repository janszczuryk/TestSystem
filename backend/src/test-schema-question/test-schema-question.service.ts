import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';

import { TestSchema } from '@module/test-schema/entities/test-schema.entity';

import { TestSchemaQuestion, TestSchemaQuestionUpdateProps } from './entities/test-schema-question.entity';

@Injectable()
export class TestSchemaQuestionService {
  public constructor(
    @InjectRepository(TestSchemaQuestion)
    private readonly testSchemaQuestionRepository: Repository<TestSchemaQuestion>,
  ) {}

  public async create(testSchemaQuestion: TestSchemaQuestion): Promise<TestSchemaQuestion> {
    return this.testSchemaQuestionRepository.save(testSchemaQuestion);
  }

  public async findAll(findAllOptions?: FindOptionsWhere<TestSchemaQuestion>): Promise<TestSchemaQuestion[]> {
    return this.testSchemaQuestionRepository.find({
      where: findAllOptions,
      order: { createdAt: 'ASC' },
      loadRelationIds: true,
    });
  }

  public async findAllRandomized(
    testSchema: TestSchema,
    limit?: number,
    offset?: number,
  ): Promise<TestSchemaQuestion[]> {
    return this.testSchemaQuestionRepository
      .createQueryBuilder('question')
      .select()
      .where('question.schema_id = :schemaId', { schemaId: testSchema.id })
      .orderBy('RANDOM()')
      .take(limit)
      .skip(offset)
      .getMany();
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
