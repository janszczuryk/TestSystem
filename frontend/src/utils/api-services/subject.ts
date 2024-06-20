import { AccountAuthorized } from "@/types/account";
import { Subject } from "@/types/subject";
import { ApiClient, useResponse } from "@/utils/api";

export type SubjectCreateProps = { name: string; fieldOfStudy: string };

export type SubjectUpdateProps = Partial<SubjectCreateProps>;

export class SubjectApiService {
  public constructor(
    private readonly account: AccountAuthorized,
    private readonly api: ApiClient,
  ) {
  }

  public async findAll(): Promise<Subject[]> {
    const url = 'subjects';
    const auth = { token: this.account.jwtToken };

    const response = await this.api.get(url, { auth });
    return useResponse<Subject[]>(response);
  }

  public async create(props: SubjectCreateProps): Promise<Subject> {
    const url = 'subjects';
    const auth = { token: this.account.jwtToken };

    const response = await this.api.post(url, { auth, body: props });
    return useResponse<Subject>(response);
  }

  public async update(subjectId: string, props: SubjectUpdateProps): Promise<Subject> {
    const url = `subjects/${ subjectId }`;
    const auth = { token: this.account.jwtToken };

    const response = await this.api.patch(url, { auth, body: props });
    return useResponse<Subject>(response);
  }

  public async remove(subjectId: string) {
    const url = `subjects/${ subjectId }`;
    const auth = { token: this.account.jwtToken };

    const response = await this.api.delete(url, { auth });
    return response.status === 204;
  }
}
