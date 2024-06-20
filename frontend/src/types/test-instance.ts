import { TestInstanceQuestion } from "@/types/test-instance-question";

export enum TestInstanceStatus {
  CREATED = 'created',
  STARTED = 'started',
  ENDED = 'ended',
}

export type TestInstance = {
  id: string;
  schema: {
    id: string;
  };
  questionsCount: number;
  questionsPool: {
    id: string;
  }[];
  isEnabled: boolean;
  status: TestInstanceStatus;
  startedAt: string | null;
  endedAt: string | null;
  teacher: {
    id: string;
  };
  updatedAt: string;
  createdAt: string;
};

export type TestInstanceWithQuestions = TestInstance & { questionsPool: TestInstanceQuestion[] };

