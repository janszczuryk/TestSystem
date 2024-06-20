import { ref } from "vue";
import { TestSchemaQuestion } from "@/types/test-schema-question";

const testSchemaQuestionList = ref<TestSchemaQuestion[]>([]);

export const useTestSchemaQuestionList = () => ({
  testSchemaQuestionList,
});
