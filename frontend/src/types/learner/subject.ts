import { TestInstanceStatus } from "@/types/test-instance";

export type Subject = {
  id: string;
  questionsCount: number;
  subjectName: string;
  fieldOfStudy: string;
  instances: {
    id: string;
    status: TestInstanceStatus;
    schemaName: string;
    startedAt: Date | null;
    endedAt: Date | null;
  }[];
};
