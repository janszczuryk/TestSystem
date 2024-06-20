import { AccountAuthorized } from "@/types/account";
import { ApiClient, useResponse } from "@/utils/api";
import { TestInstance, TestInstanceWithQuestions } from "@/types/test-instance";

export type TestInstanceCreateProps = { isEnabled: boolean; questionsCount: number; };

export type TestInstanceUpdateProps = Partial<TestInstanceCreateProps>;

export class TestInstanceApiService {
  public constructor(
    private readonly account: AccountAuthorized,
    private readonly api: ApiClient,
  ) {
  }

  public async findAll(schemaId: string): Promise<TestInstance[]> {
    const url = `schemas/${ schemaId }/instances`;
    const auth = { token: this.account.jwtToken };

    const response = await this.api.get(url, { auth });
    return useResponse<TestInstance[]>(response);
  }

  public async create(schemaId: string, props: TestInstanceCreateProps): Promise<TestInstance> {
    const url = `schemas/${ schemaId }/instances`;
    const auth = { token: this.account.jwtToken };

    const response = await this.api.post(url, { auth, body: props });
    return useResponse<TestInstance>(response);
  }

  public async get(schemaId: string, instanceId: string): Promise<TestInstanceWithQuestions> {
    const url = `schemas/${ schemaId }/instances/${ instanceId }`;
    const auth = { token: this.account.jwtToken };

    const response = await this.api.get(url, { auth });
    return useResponse<TestInstanceWithQuestions>(response);
  }

  public async update(schemaId: string, instanceId: string, props: TestInstanceUpdateProps): Promise<TestInstance> {
    const url = `schemas/${ schemaId }/instances/${ instanceId }`;
    const auth = { token: this.account.jwtToken };

    const response = await this.api.patch(url, { auth, body: props });
    return useResponse<TestInstance>(response);
  }

  public async remove(schemaId: string, instanceId: string) {
    const url = `schemas/${ schemaId }/instances/${ instanceId }`;
    const auth = { token: this.account.jwtToken };

    const response = await this.api.delete(url, { auth });
    return response.status === 204;
  }

  public async start(schemaId: string, instanceId: string): Promise<TestInstance> {
    const url = `schemas/${ schemaId }/instances/${ instanceId }/start`;
    const auth = { token: this.account.jwtToken };

    const response = await this.api.post(url, { auth });
    return useResponse<TestInstance>(response);
  }

  public async end(schemaId: string, instanceId: string): Promise<TestInstance> {
    const url = `schemas/${ schemaId }/instances/${ instanceId }/end`;
    const auth = { token: this.account.jwtToken };

    const response = await this.api.post(url, { auth });
    return useResponse<TestInstance>(response);
  }
}
