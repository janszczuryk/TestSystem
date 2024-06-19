import { AccountResponseDto } from '@module/account/dto/response';
import { ResponseEntityOrId } from '@module/common/types';
import { TestInstance } from '@module/test-instance/entities/test-instance.entity';
import { TestInstanceQuestionResponseDto } from '@module/test-instance-question/dto/response';
import { TestSchemaResponseDto } from '@module/test-schema/dto/response';

export class TestInstanceResponseDto {
  public readonly id: string;
  public readonly schema: ResponseEntityOrId<TestSchemaResponseDto>;
  public readonly questionsCount: number;
  public readonly questionsPool: ResponseEntityOrId<TestInstanceQuestionResponseDto>[];
  public readonly isEnabled: boolean;
  public readonly status: string;
  public readonly startedAt: Date | null;
  public readonly endedAt: Date | null;
  public readonly teacher: ResponseEntityOrId<AccountResponseDto>;
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
    this.updatedAt = testInstance.updatedAt;
    this.createdAt = testInstance.createdAt;
  }
}
