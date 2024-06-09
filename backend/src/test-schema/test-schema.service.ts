import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';

import { TestSchema, TestSchemaUpdateProps } from './entities/test-schema.entity';

export class TestSchemaServiceError extends Error {}

export class TestSchemaServiceUpdateError extends TestSchemaServiceError {}

export class TestSchemaServiceUpdateDuplicateError extends TestSchemaServiceUpdateError {}

@Injectable()
export class TestSchemaService {
  public constructor(
    @InjectRepository(TestSchema)
    private readonly testSchemaRepository: Repository<TestSchema>,
  ) {}

  public async create(testSchema: TestSchema): Promise<TestSchema> {
    return this.testSchemaRepository.save(testSchema);
  }

  public async findAll(): Promise<TestSchema[]> {
    return this.testSchemaRepository.find({
      loadRelationIds: true,
    });
  }

  public async find(findOptions: FindOptionsWhere<TestSchema>): Promise<TestSchema | null> {
    return this.testSchemaRepository.findOne({
      where: findOptions,
      relations: { subject: true, questions: true, instances: true },
    });
  }

  public async get(id: string): Promise<TestSchema | null> {
    return this.testSchemaRepository.findOne({
      where: { id },
      relations: { subject: true, questions: true, instances: true },
    });
  }

  public async update(testSchema: TestSchema, props: TestSchemaUpdateProps): Promise<TestSchema> {
    const existingTestSchema = await this.testSchemaRepository.findOneBy({
      name: props.name || testSchema.name,
    });
    if (existingTestSchema && existingTestSchema.id !== testSchema.id) {
      throw new TestSchemaServiceUpdateDuplicateError('Test schema with this name already exists');
    }

    testSchema.update(props);

    return this.testSchemaRepository.save(testSchema);
  }

  public async remove(testSchema: TestSchema): Promise<void> {
    await this.testSchemaRepository.remove(testSchema);
  }
}
