import {TestInstanceStatus} from "@/types/test-instance";

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
