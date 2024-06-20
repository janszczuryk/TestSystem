import { AccountAuthorized } from "@/types/account";
import { ApiClient, useResponse } from "@/utils/api";
import { TestSchemaQuestion } from "@/types/test-schema-question";

export type TestSchemaQuestionCreateProps = {
  question: string;
  answers: string[];
  correctAnswerIndex: number;
};

export type TestSchemaQuestionUpdateProps = Partial<TestSchemaQuestionCreateProps>;

export class TestSchemaQuestionApiService {
  public constructor(
    private readonly account: AccountAuthorized,
    private readonly api: ApiClient,
  ) {
  }

  public async findAll(schemaId: string): Promise<TestSchemaQuestion[]> {
    const url = `schemas/${ schemaId }/questions`;
    const auth = { token: this.account.jwtToken };

    const response = await this.api.get(url, { auth });
    return useResponse<TestSchemaQuestion[]>(response);
  }

  public async create(schemaId: string, props: TestSchemaQuestionCreateProps): Promise<TestSchemaQuestion> {
    const url = `schemas/${ schemaId }/questions`;
    const auth = { token: this.account.jwtToken };

    const response = await this.api.post(url, { auth, body: props });
    return useResponse<TestSchemaQuestion>(response);
  }

  public async update(schemaId: string, questionId: string, props: TestSchemaQuestionUpdateProps): Promise<TestSchemaQuestion> {
    const url = `schemas/${ schemaId }/questions/${ questionId }`;
    const auth = { token: this.account.jwtToken };

    const response = await this.api.patch(url, { auth, body: props });
    return useResponse<TestSchemaQuestion>(response);
  }

  public async remove(schemaId: string, questionId: string) {
    const url = `schemas/${ schemaId }/questions/${ questionId }`;
    const auth = { token: this.account.jwtToken };

    const response = await this.api.delete(url, { auth });
    return response.status === 204;
  }
}
