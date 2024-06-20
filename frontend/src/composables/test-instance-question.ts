import { ref } from "vue";
import { TestInstanceQuestion } from "@/types/test-instance";

const testInstanceQuestionList = ref<TestInstanceQuestion[]>([]);

export const useTestInstanceQuestionList = () => ({
  testInstanceQuestionList,
});
