import { TestInstanceLearnerAnswer } from '@module/test-instance-learner-answer/entities/test-instance-learner-answer.entity';

export class TestInstanceLearnerAnswerResponseDto {
  public id: string;
  public instanceLearnerInstanceId: string;
  public instanceLearnerLearnerId: string;
  public questionNumber: number;
  public status: string;
  public submittedAnswerIndex: number | null;
  public shownAt: Date | null;
  public answerSubmittedAt: Date | null;
  public updatedAt: Date;
  public createdAt: Date;

  public constructor(testInstanceLearnerAnswer: TestInstanceLearnerAnswer) {
    this.id = testInstanceLearnerAnswer.id;
    this.instanceLearnerInstanceId = testInstanceLearnerAnswer.instanceLearnerInstanceId;
    this.instanceLearnerLearnerId = testInstanceLearnerAnswer.instanceLearnerLearnerId;
    this.questionNumber = testInstanceLearnerAnswer.questionNumber;
    this.status = testInstanceLearnerAnswer.status;
    this.submittedAnswerIndex = testInstanceLearnerAnswer.submittedAnswerIndex ?? null;
    this.shownAt = testInstanceLearnerAnswer.shownAt ?? null;
    this.answerSubmittedAt = testInstanceLearnerAnswer.answerSubmittedAt ?? null;
    this.updatedAt = testInstanceLearnerAnswer.updatedAt;
    this.createdAt = testInstanceLearnerAnswer.createdAt;
  }
}
