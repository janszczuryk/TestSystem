import { AccountAuthorized } from "@/types/account";
import { ApiClient, useResponse } from "@/utils/api";
import { TestInstanceLearner, TestInstanceLearnerWithAnswers } from "@/types/test-instance-learner";

export type TestInstanceLearnerCreateProps = { learnerId: string; learnerNumber: number; };

export type TestInstanceLearnerUpdateProps = Partial<{ learnerNumber: number; }>;

export class TestInstanceLearnerApiService {
  public constructor(
    private readonly account: AccountAuthorized,
    private readonly api: ApiClient,
  ) {
  }

  public async findAll(instanceId: string): Promise<TestInstanceLearner[]> {
    const url = `instances/${ instanceId }/learners`;
    const auth = { token: this.account.jwtToken };

    const response = await this.api.get(url, { auth });
    return useResponse<TestInstanceLearner[]>(response);
  }

  public async create(instanceId: string, props: TestInstanceLearnerCreateProps): Promise<TestInstanceLearner> {
    const url = `instances/${ instanceId }/learners`;
    const auth = { token: this.account.jwtToken };

    const response = await this.api.post(url, { auth, body: props });
    return useResponse<TestInstanceLearner>(response);
  }

  public async get(instanceId: string, learnerId: string): Promise<TestInstanceLearnerWithAnswers> {
    const url = `instances/${ instanceId }/learners/${ learnerId }`;
    const auth = { token: this.account.jwtToken };

    const response = await this.api.get(url, { auth });
    return useResponse<TestInstanceLearnerWithAnswers>(response);
  }

  public async update(instanceId: string, learnerId: string, props: TestInstanceLearnerUpdateProps): Promise<TestInstanceLearner> {
    const url = `instances/${ instanceId }/learners/${ learnerId }`;
    const auth = { token: this.account.jwtToken };

    const response = await this.api.patch(url, { auth, body: props });
    return useResponse<TestInstanceLearner>(response);
  }

  public async remove(instanceId: string, learnerId: string) {
    const url = `instances/${ instanceId }/learners/${ learnerId }`;
    const auth = { token: this.account.jwtToken };

    const response = await this.api.delete(url, { auth });
    return response.status === 204;
  }
}
