import { ChildEntity, OneToMany } from 'typeorm';
import { Account, AccountType } from './account.entity';
import { TestInstanceResult } from '../../test-instance-result/entities/test-instance-result.entity';

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
