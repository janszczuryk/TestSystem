import {TestInstanceLearnerAnswerStatus} from "@/types/test-instance-learner-answer";


const statusMap: Record<TestInstanceLearnerAnswerStatus, string> = {
  [TestInstanceLearnerAnswerStatus.CREATED]: 'Wylosowano pyt.',
  [TestInstanceLearnerAnswerStatus.SHOWN]: 'Pokazano pyt.',
  [TestInstanceLearnerAnswerStatus.CORRECT_ANSWER_SUBMITTED]: 'Poprawna odp.',
  [TestInstanceLearnerAnswerStatus.INCORRECT_ANSWER_SUBMITTED]: 'Niepoprawna odp.',
};

export const getTestInstanceLearnerAnswerStatusName = (status: TestInstanceLearnerAnswerStatus): string => {
  return statusMap[status] ?? '';
};
