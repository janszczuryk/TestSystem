import { ChildEntity, OneToMany } from 'typeorm';
import { Account, AccountType } from './account.entity';
import { TestInstance } from '../../test-instance/entities/test-instance.entity';

export type TeacherAccountCreateProps = Pick<TeacherAccount, 'isVerified'>;

@ChildEntity(AccountType.TEACHER)
export class TeacherAccount extends Account {
  public type: AccountType.TEACHER;
  @OneToMany(() => TestInstance, (testInstance) => testInstance.teacher)
  public testInstances: TestInstance[];
}
