import { AccountResponseDto } from '@module/account/dto/response';
import { ResponseEntityOrId } from '@module/common/types';
import { TestInstance } from '@module/test-instance/entities/test-instance.entity';
import { TestInstanceQuestion } from '@module/test-instance-question/entities/test-instance-question.entity';
import { TestSchemaResponseDto } from '@module/test-schema/dto/response';

export class TestInstanceResponseDto {
  public readonly id: string;
  public readonly schema: ResponseEntityOrId<TestSchemaResponseDto>;
  public readonly questionsCount: number;
  public readonly questionsPool: ResponseEntityOrId<object>[];
  public readonly isEnabled: boolean;
  public readonly status: string;
  public readonly startedAt: Date | null;
  public readonly endedAt: Date | null;
  public readonly teacher: ResponseEntityOrId<AccountResponseDto>;
  public readonly results: ResponseEntityOrId<object>[];
  public readonly updatedAt: Date;
  public readonly createdAt: Date;

  public constructor(testInstance: TestInstance) {
    this.id = testInstance.id;
    this.schema = testInstance.schema?.id
      ? new TestSchemaResponseDto(testInstance.schema)
      : { id: String(testInstance.schema) };
    this.questionsCount = testInstance.questionsCount;
    this.questionsPool =
      testInstance.questionsPool?.map((testInstanceQuestion) =>
        testInstanceQuestion?.id
          ? new TestInstanceQuestionResponseDto(testInstanceQuestion)
          : { id: String(testInstanceQuestion) },
      ) ?? null;
    this.isEnabled = testInstance.isEnabled;
    this.status = testInstance.status;
    this.startedAt = testInstance.startedAt ?? null;
    this.endedAt = testInstance.endedAt ?? null;
    this.teacher = testInstance.teacher?.id
      ? new AccountResponseDto(testInstance.teacher)
      : { id: String(testInstance.teacher) };
    this.results =
      testInstance.results?.map((testInstanceResult) =>
        testInstanceResult?.id ? new Object(testInstanceResult) : { id: String(testInstanceResult) },
      ) ?? null;
    this.updatedAt = testInstance.updatedAt;
    this.createdAt = testInstance.createdAt;
  }
}

class TestInstanceQuestionResponseDto {
  public readonly id: string;
  public readonly schemaQuestion: { id: string } | null;
  public readonly question: string;
  public readonly answers: string[];
  public readonly correctAnswerIndex: number;
  public readonly updatedAt: Date;
  public readonly createdAt: Date;

  public constructor(testInstanceQuestion: TestInstanceQuestion) {
    this.id = testInstanceQuestion.id;
    this.schemaQuestion = testInstanceQuestion.schemaQuestion?.id
      ? { id: testInstanceQuestion.schemaQuestion.id }
      : null;
    this.question = testInstanceQuestion.question;
    this.answers = testInstanceQuestion.answers;
    this.correctAnswerIndex = testInstanceQuestion.correctAnswerIndex;
    this.updatedAt = testInstanceQuestion.updatedAt;
    this.createdAt = testInstanceQuestion.createdAt;
  }
}
