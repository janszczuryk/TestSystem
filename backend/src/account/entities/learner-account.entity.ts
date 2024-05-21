import { ChildEntity, OneToMany } from 'typeorm';

import { TestInstanceResult } from '@module/test-instance-result/entities/test-instance-result.entity';

import { Account, AccountType } from './account.entity';

export type LearnerAccountCreateProps = Pick<LearnerAccount, 'isVerified'>;

@ChildEntity(AccountType.LEARNER)
export class LearnerAccount extends Account {
  public type: AccountType.LEARNER;
  @OneToMany(
    () => TestInstanceResult,
    (testInstanceResult) => testInstanceResult.learner,
  )
  public testInstanceResults: TestInstanceResult[];
}
