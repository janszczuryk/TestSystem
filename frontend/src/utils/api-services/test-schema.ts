import { AccountAuthorized } from "@/types/account";
import { ApiClient, useResponse } from "@/utils/api";
import { TestSchema } from "@/types/test-schema";

export type TestSchemaCreateProps = { name: string; subjectId: string };

export type TestSchemaUpdateProps = Partial<TestSchemaCreateProps>;

export class TestSchemaApiService {
  public constructor(
    private readonly account: AccountAuthorized,
    private readonly api: ApiClient,
  ) {
  }

  public async findAll(): Promise<TestSchema[]> {
    const url = 'schemas';
    const auth = { token: this.account.jwtToken };

    const response = await this.api.get(url, { auth });
    return useResponse<TestSchema[]>(response);
  }

  public async create(props: TestSchemaCreateProps): Promise<TestSchema> {
    const url = 'schemas';
    const auth = { token: this.account.jwtToken };

    const response = await this.api.post(url, { auth, body: props });
    return useResponse<TestSchema>(response);
  }

  public async update(schemaId: string, props: TestSchemaUpdateProps): Promise<TestSchema> {
    const url = `schemas/${ schemaId }`;
    const auth = { token: this.account.jwtToken };

    const response = await this.api.patch(url, { auth, body: props });
    return useResponse<TestSchema>(response);
  }

  public async remove(schemaId: string) {
    const url = `schemas/${ schemaId }`;
    const auth = { token: this.account.jwtToken };

    const response = await this.api.delete(url, { auth });
    return response.status === 204;
  }
}
