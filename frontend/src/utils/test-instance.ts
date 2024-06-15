import {TestInstanceStatus} from "@/types/test-instance";

export const getStatusName = (status: TestInstanceStatus): string => {
  const statusMap: Record<TestInstanceStatus, string> = {
    [TestInstanceStatus.CREATED]: 'Oczekiwanie',
    [TestInstanceStatus.STARTED]: 'Rozpoczęto',
    [TestInstanceStatus.ENDED]: 'Zakończono',
  };

  return statusMap[status] ?? '';
};
