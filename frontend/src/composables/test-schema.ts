import { ref } from "vue";
import { TestSchema } from "@/types/test-schema";

const testSchemaList = ref<TestSchema[]>([]);

export const useTestSchemaList = () => ({
  testSchemaList,
});
