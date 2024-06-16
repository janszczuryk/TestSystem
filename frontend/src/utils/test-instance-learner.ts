import {TestInstanceLearnerStatus} from "@/types/test-instance-learner";

const statusMap: Record<TestInstanceLearnerStatus, string> = {
  [TestInstanceLearnerStatus.JOINED]: 'Dołączono',
  [TestInstanceLearnerStatus.STARTED]: 'Rozwiązywanie',
  [TestInstanceLearnerStatus.FINISHED]: 'Rozwiązano',
};

export const getTestInstanceLearnerStatusName = (status: TestInstanceLearnerStatus): string => {
  return statusMap[status] ?? '';
};
