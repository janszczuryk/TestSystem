import { ChildEntity, OneToMany } from 'typeorm';

import { randomUUID } from 'crypto';

import { TestInstance } from '@module/test-instance/entities/test-instance.entity';

import { Account, AccountCreateProps, AccountType } from './account.entity';

@ChildEntity(AccountType.TEACHER)
export class TeacherAccount extends Account {
  public type: AccountType.TEACHER;
  @OneToMany(() => TestInstance, (testInstance) => testInstance.teacher)
  public testInstances: TestInstance[];

  public static create(props: AccountCreateProps): TeacherAccount {
    const now = new Date();
    const teacherAccount = new TeacherAccount();

    Object.assign(teacherAccount, {
      id: randomUUID(),
      email: props.email,
      password: props.password,
      isVerified: props.isVerified,
      type: AccountType.TEACHER,
      testInstances: [],
      updatedAt: now,
      createdAt: now,
    });

    return teacherAccount;
  }
}
