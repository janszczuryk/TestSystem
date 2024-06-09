import { ResponseEntityOrId } from '@module/common/types';
import { SubjectResponseDto } from '@module/subject/dto/response';
import { TestSchema } from '@module/test-schema/entities/test-schema.entity';
import { TestSchemaQuestionResponseDto } from '@module/test-schema-question/dto/response';

export class TestSchemaResponseDto {
  public readonly id: string;
  public readonly name: string;
  public readonly subject: ResponseEntityOrId<SubjectResponseDto>;
  public readonly questions: ResponseEntityOrId<TestSchemaQuestionResponseDto>[];
  public readonly instances: ResponseEntityOrId<object>[];
  public readonly updatedAt: Date;
  public readonly createdAt: Date;

  public constructor(testSchema: TestSchema) {
    this.id = testSchema.id;
    this.name = testSchema.name;
    this.subject = testSchema.subject?.id
      ? new SubjectResponseDto(testSchema.subject)
      : { id: String(testSchema.subject) };
    this.questions =
      testSchema.questions?.map((question) =>
        question?.id ? new TestSchemaQuestionResponseDto(question) : { id: String(question) },
      ) ?? null;
    this.instances =
      testSchema.instances?.map((instance) => (instance?.id ? new Object(instance) : { id: String(instance) })) ?? null;
    this.updatedAt = testSchema.updatedAt;
    this.createdAt = testSchema.createdAt;
  }
}
