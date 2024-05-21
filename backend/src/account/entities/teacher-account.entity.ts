import { ChildEntity, OneToMany } from 'typeorm';

import { TestInstance } from '@module/test-instance/entities/test-instance.entity';

import { Account, AccountType } from './account.entity';

export type TeacherAccountCreateProps = Pick<TeacherAccount, 'isVerified'>;

@ChildEntity(AccountType.TEACHER)
export class TeacherAccount extends Account {
  public type: AccountType.TEACHER;
  @OneToMany(() => TestInstance, (testInstance) => testInstance.teacher)
  public testInstances: TestInstance[];
}
