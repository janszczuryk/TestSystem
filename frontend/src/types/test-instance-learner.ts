import { TestInstanceLearnerAnswer } from "@/types/test-instance-learner-answer";

export enum TestInstanceLearnerStatus {
  JOINED = 'joined',
  STARTED = 'started',
  FINISHED = 'finished',
}

export type TestInstanceLearner = {
  instanceId: string;
  learnerId: string;
  learnerNumber: number;
  answers: {
    id: string;
  }[];
  resultSummary: TestInstanceLearnerResultSummary;
  status: TestInstanceLearnerStatus;
  startedAt: string | null;
  finishedAt: string | null;
  updatedAt: string;
  createdAt: string;
};

export type TestInstanceLearnerResultSummary = {
  pointsToAchieve: number;
  pointsAchieved: number;
  percentage: number;
};

export type TestInstanceLearnerWithAnswers = TestInstanceLearner & { answers: TestInstanceLearnerAnswer[] };
