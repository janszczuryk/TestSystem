import { TestInstanceLearnerAnswerStatus } from "@/types/test-instance-learner-answer";

export type TestInstanceLearnerAnswer = {
  id: string;
  instanceId: string;
  learnerId: string;
  question: TestInstanceLearnerAnswerQuestion;
  questionNumber: number;
  status: TestInstanceLearnerAnswerStatus;
  submittedAnswerIndex: number | null;
  shownAt: string | null;
  answerSubmittedAt: string | null;
  updatedAt: string;
  createdAt: string;
};

type TestInstanceLearnerAnswerQuestion = {
  id: string;
  question: string;
  answers: string[];
};
