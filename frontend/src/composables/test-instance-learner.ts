import { ref } from "vue";
import { TestInstanceLearner } from "@/types/test-instance-learner";

const testInstanceLearnerList = ref<TestInstanceLearner[]>([]);

export const useTestInstanceLearnerList = () => ({
  testInstanceLearnerList,
});
