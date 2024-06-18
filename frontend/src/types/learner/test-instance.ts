import { TestInstanceStatus } from "@/types/test-instance";
import { TestInstanceLearnerStatus } from "@/types/test-instance-learner";

export type TestInstance = {
  id: string;
  questionsCount: number,
  isEnabled: boolean,
  status: TestInstanceStatus,
  schema: {
    id: string;
    name: string;
  },
  subject: {
    id: string;
    name: string;
    fieldOfStudy: string;
  },
  learner: TestInstanceLearner | null;
  teacher: {
    id: string;
    email: string;
    isVerified: boolean;
  },
  startedAt: string | null;
  endedAt: string | null;
  updatedAt: string;
  createdAt: string;
};

type TestInstanceLearner = {
  instanceId: string;
  learnerId: string;
  learnerNumber: number,
  status: TestInstanceLearnerStatus,
  startedAt: string | null;
  finishedAt: string | null;
  updatedAt: string;
  createdAt: string;
};
