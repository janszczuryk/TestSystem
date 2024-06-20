import { ref } from "vue";
import { TestInstanceQuestion } from "@/types/test-instance-question";

const testInstanceQuestionList = ref<TestInstanceQuestion[]>([]);

export const useTestInstanceQuestionList = () => ({
  testInstanceQuestionList,
});
