import { ref } from "vue";
import { TestInstance } from "@/types/test-instance";

const testInstanceList = ref<TestInstance[]>([]);

export const useTestInstanceList = () => ({
  testInstanceList,
});
