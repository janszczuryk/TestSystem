import { Column, Entity, PrimaryColumn, TableInheritance } from 'typeorm';

export enum AccountType {
  LEARNER = 'learner',
  TEACHER = 'teacher',
}

export type AccountCreateProps = Pick<Account, 'isVerified' | 'type'>;

@Entity()
@TableInheritance({ column: 'type' })
export abstract class Account {
  @PrimaryColumn({ type: 'varchar', length: 36 })
  public id: string;
  @Column({ type: 'bool', nullable: false })
  public isVerified: boolean;
  @Column({ type: 'enum', enum: AccountType, nullable: false })
  public type: AccountType;
  @Column({ type: 'timestamp', nullable: false })
  public updatedAt: Date;
  @Column({ type: 'timestamp', nullable: false })
  public createdAt: Date;
}
