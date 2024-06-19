import { TestInstanceQuestion } from '@module/test-instance-question/entities/test-instance-question.entity';

export class TestInstanceQuestionResponseDto {
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
