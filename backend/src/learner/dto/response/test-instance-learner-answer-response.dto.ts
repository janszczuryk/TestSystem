import { TestInstanceLearnerAnswer } from '@module/test-instance-learner-answer/entities/test-instance-learner-answer.entity';
import { TestInstanceQuestion } from '@module/test-instance-question/entities/test-instance-question.entity';

export class TestInstanceLearnerAnswerResponseDto {
  public id: string;
  public instanceId: string;
  public learnerId: string;
  public question: TestInstanceQuestionResponseDto;
  public questionNumber: number;
  public status: string;
  public submittedAnswerIndex: number | null;
  public shownAt: Date | null;
  public answerSubmittedAt: Date | null;
  public updatedAt: Date;
  public createdAt: Date;

  public constructor(testInstanceLearnerAnswer: TestInstanceLearnerAnswer) {
    this.id = testInstanceLearnerAnswer.id;
    this.instanceId = testInstanceLearnerAnswer.instanceLearnerInstanceId;
    this.learnerId = testInstanceLearnerAnswer.instanceLearnerLearnerId;
    this.question = new TestInstanceQuestionResponseDto(testInstanceLearnerAnswer.instanceQuestion);
    this.questionNumber = testInstanceLearnerAnswer.questionNumber;
    this.status = testInstanceLearnerAnswer.status;
    this.submittedAnswerIndex = testInstanceLearnerAnswer.submittedAnswerIndex ?? null;
    this.shownAt = testInstanceLearnerAnswer.shownAt ?? null;
    this.answerSubmittedAt = testInstanceLearnerAnswer.answerSubmittedAt ?? null;
    this.updatedAt = testInstanceLearnerAnswer.updatedAt;
    this.createdAt = testInstanceLearnerAnswer.createdAt;
  }
}

class TestInstanceQuestionResponseDto {
  public id: string;
  public question: string;
  public answers: string[];

  public constructor(testInstanceQuestion: TestInstanceQuestion) {
    this.id = testInstanceQuestion.id;
    this.question = testInstanceQuestion.question;
    this.answers = testInstanceQuestion.answers;
  }
}
