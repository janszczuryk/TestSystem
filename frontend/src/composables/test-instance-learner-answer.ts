import { ref } from "vue";
import { TestInstanceLearnerAnswer } from "@/types/test-instance-learner-answer";

const testInstanceLearnerAnswerList = ref<TestInstanceLearnerAnswer[]>([]);

export const useTestInstanceLearnerAnswerList = () => ({
  testInstanceLearnerAnswerList,
});
