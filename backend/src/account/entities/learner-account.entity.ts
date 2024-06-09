import { ChildEntity, OneToMany } from 'typeorm';

import { randomUUID } from 'crypto';

import { TestInstanceResult } from '@module/test-instance-result/entities/test-instance-result.entity';

import { Account, AccountCreateProps, AccountType } from './account.entity';

@ChildEntity(AccountType.LEARNER)
export class LearnerAccount extends Account {
  public type: AccountType.LEARNER;
  @OneToMany(() => TestInstanceResult, (testInstanceResult) => testInstanceResult.learner)
  public testInstanceResults: TestInstanceResult[];

  public static create(props: AccountCreateProps): LearnerAccount {
    const now = new Date();
    const learnerAccount = new LearnerAccount();

    Object.assign(learnerAccount, {
      id: randomUUID(),
      email: props.email,
      password: props.password,
      isVerified: props.isVerified,
      type: AccountType.LEARNER,
      testInstanceResults: [],
      updatedAt: now,
      createdAt: now,
    });

    return learnerAccount;
  }
}
