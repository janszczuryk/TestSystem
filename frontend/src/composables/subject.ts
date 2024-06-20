import { ref } from "vue";
import { Subject } from "@/types/subject";

const subjectList = ref<Subject[]>([]);

const subjectListGet = (subjectId: string): Subject | null => {
  return subjectList.value.find((subject) => subject.id === subjectId) ?? null;
}

export const useSubjectList = () => ({
  subjectList,
  subjectListGet,
});
