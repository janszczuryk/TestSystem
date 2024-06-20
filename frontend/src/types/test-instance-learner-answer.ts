import { TestInstanceQuestion } from "@/types/test-instance-question";

export enum TestInstanceLearnerAnswerStatus {
  CREATED = 'created',
  SHOWN = 'shown',
  CORRECT_ANSWER_SUBMITTED = 'correct_answer_submitted',
  INCORRECT_ANSWER_SUBMITTED = 'incorrect_answer_submitted',
}

export type TestInstanceLearnerAnswer = {
  id: string;
  instanceLearnerInstanceId: string;
  instanceLearnerLearnerId: string;
  questionNumber: number;
  instanceQuestion: TestInstanceQuestion;
  status: TestInstanceLearnerAnswerStatus;
  submittedAnswerIndex: number;
  shownAt: string | null;
  answerSubmittedAt: string | null;
  updatedAt: string;
  createdAt: string;
};
