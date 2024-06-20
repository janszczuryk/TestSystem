export type TestSchema = {
  id: string;
  name: string;
  subject: {
    id: string;
  };
  questions: {
    id: string;
  }[];
  instances: {
    id: string;
  }[];
  updatedAt: string;
  createdAt: string;
};
