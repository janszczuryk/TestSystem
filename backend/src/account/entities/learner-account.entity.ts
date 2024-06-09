import { ChildEntity, OneToMany } from 'typeorm';

import { randomUUID } from 'crypto';

import { TestInstanceLearner } from '@module/test-instance-learner/entities/test-instance-learner.entity';

import { Account, AccountCreateProps, AccountType } from './account.entity';

@ChildEntity(AccountType.LEARNER)
export class LearnerAccount extends Account {
  public type: AccountType.LEARNER;
  @OneToMany(() => TestInstanceLearner, (testInstanceLearner) => testInstanceLearner.learner)
  public testInstanceLearners: TestInstanceLearner[];

  public static create(props: AccountCreateProps): LearnerAccount {
    const now = new Date();
    const learnerAccount = new LearnerAccount();

    Object.assign(learnerAccount, {
      id: randomUUID(),
      email: props.email,
      password: props.password,
      isVerified: props.isVerified,
      type: AccountType.LEARNER,
      updatedAt: now,
      createdAt: now,
    });

    return learnerAccount;
  }
}
