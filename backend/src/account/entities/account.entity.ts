import { Column, Entity, PrimaryColumn, TableInheritance } from 'typeorm';

import { LearnerAccount } from '@module/account/entities/learner-account.entity';
import { TeacherAccount } from '@module/account/entities/teacher-account.entity';

export enum AccountType {
  LEARNER = 'learner',
  TEACHER = 'teacher',
}

export type AccountTypeMapping = {
  [AccountType.LEARNER]: LearnerAccount;
  [AccountType.TEACHER]: TeacherAccount;
};

export type AccountCreateProps = Pick<Account, 'email' | 'password' | 'isVerified'>;

export type AccountUpdateProps = Partial<AccountCreateProps>;

@Entity()
@TableInheritance({ column: 'type' })
export abstract class Account {
  @PrimaryColumn({ type: 'varchar', length: 36 })
  public id: string;
  @Column({ type: 'varchar', length: 250, nullable: false, unique: true })
  public email: string;
  @Column({ type: 'varchar', length: 72, nullable: false })
  public password: string;
  @Column({ type: 'bool', nullable: false })
  public isVerified: boolean;
  @Column({ type: 'enum', enum: AccountType, nullable: false })
  public type: AccountType;
  @Column({ type: 'timestamp', nullable: false })
  public updatedAt: Date;
  @Column({ type: 'timestamp', nullable: false })
  public createdAt: Date;

  public update(props: AccountUpdateProps): void {
    Object.assign(this, props);

    this.updatedAt = new Date();
  }
}
