import { TestInstanceStatus } from "@/types/test-instance";

const statusMap: Record<TestInstanceStatus, string> = {
  [TestInstanceStatus.CREATED]: 'Oczekiwanie',
  [TestInstanceStatus.STARTED]: 'Rozpoczęto',
  [TestInstanceStatus.ENDED]: 'Zakończono',
};

export const getTestInstanceStatusName = (status: TestInstanceStatus): string => {
  return statusMap[status] ?? '';
};
