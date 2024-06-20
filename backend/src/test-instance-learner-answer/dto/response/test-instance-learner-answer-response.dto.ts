import { ResponseEntityOrId } from '@module/common/types';
import { TestInstanceLearnerAnswer } from '@module/test-instance-learner-answer/entities/test-instance-learner-answer.entity';
import { TestInstanceQuestionResponseDto } from '@module/test-instance-question/dto/response';

export class TestInstanceLearnerAnswerResponseDto {
  public id: string;
  public instanceLearnerInstanceId: string;
  public instanceLearnerLearnerId: string;
  public questionNumber: number;
  public instanceQuestion: ResponseEntityOrId<TestInstanceQuestionResponseDto>;
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
    this.instanceQuestion = testInstanceLearnerAnswer.instanceQuestion?.id
      ? new TestInstanceQuestionResponseDto(testInstanceLearnerAnswer.instanceQuestion)
      : { id: String(testInstanceLearnerAnswer.instanceQuestion) };
    this.status = testInstanceLearnerAnswer.status;
    this.submittedAnswerIndex = testInstanceLearnerAnswer.submittedAnswerIndex ?? null;
    this.shownAt = testInstanceLearnerAnswer.shownAt ?? null;
    this.answerSubmittedAt = testInstanceLearnerAnswer.answerSubmittedAt ?? null;
    this.updatedAt = testInstanceLearnerAnswer.updatedAt;
    this.createdAt = testInstanceLearnerAnswer.createdAt;
  }
}
