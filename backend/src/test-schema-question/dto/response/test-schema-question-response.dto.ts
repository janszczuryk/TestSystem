import { ResponseEntityOrId } from '@module/common/types';
import { TestSchemaResponseDto } from '@module/test-schema/dto/response';
import { TestSchemaQuestion } from '@module/test-schema-question/entities/test-schema-question.entity';

export class TestSchemaQuestionResponseDto {
  public readonly id: string;
  public readonly question: string;
  public readonly answers: string[];
  public readonly correctAnswerIndex: number;
  public readonly schema: ResponseEntityOrId<TestSchemaResponseDto>;
  public readonly instanceQuestions: ResponseEntityOrId<object>[];
  public readonly updatedAt: Date;
  public readonly createdAt: Date;

  public constructor(testSchemaQuestion: TestSchemaQuestion) {
    this.id = testSchemaQuestion.id;
    this.question = testSchemaQuestion.question;
    this.answers = testSchemaQuestion.answers;
    this.correctAnswerIndex = testSchemaQuestion.correctAnswerIndex;
    this.schema = testSchemaQuestion.schema?.id
      ? new TestSchemaResponseDto(testSchemaQuestion.schema)
      : { id: String(testSchemaQuestion.schema) };
    this.instanceQuestions =
      testSchemaQuestion.instanceQuestions?.map((instanceQuestion) =>
        instanceQuestion?.id ? new Object(instanceQuestion) : { id: String(instanceQuestion) },
      ) ?? null;
    this.updatedAt = testSchemaQuestion.updatedAt;
    this.createdAt = testSchemaQuestion.createdAt;
  }
}
