export type TestSchemaQuestion = {
  id: string;
  question: string;
  answers: string[];
  correctAnswerIndex: number;
  schema: {
    id: string;
  };
  instanceQuestions: {
    id: string;
  }[];
  updatedAt: string;
  createdAt: string;
};
