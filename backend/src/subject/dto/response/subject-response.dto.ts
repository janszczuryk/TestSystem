import { ResponseEntityOrId } from '@module/common/types';
import { Subject } from '@module/subject/entities/subject.entity';
import { TestSchemaResponseDto } from '@module/test-schema/dto/response';

export class SubjectResponseDto {
  public readonly id: string;
  public readonly name: string;
  public readonly fieldOfStudy: string;
  public readonly testSchemas: ResponseEntityOrId<TestSchemaResponseDto>[];
  public readonly updatedAt: Date;
  public readonly createdAt: Date;

  public constructor(subject: Subject) {
    this.id = subject.id;
    this.name = subject.name;
    this.fieldOfStudy = subject.fieldOfStudy;
    this.testSchemas =
      subject.testSchemas?.map((testSchema) =>
        testSchema?.id ? new TestSchemaResponseDto(testSchema) : { id: String(testSchema) },
      ) ?? null;
    this.updatedAt = subject.updatedAt;
    this.createdAt = subject.createdAt;
  }
}
