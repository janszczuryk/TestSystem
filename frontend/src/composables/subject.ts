import { ref } from "vue";
import { Subject } from "@/types/subject";

const subjectList = ref<Subject[]>([]);

export const useSubjectList = () => {
  return {
    subjectList,
  };
};
