import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';

import { LearnerAccount } from '@module/account/entities/learner-account.entity';
import { TestInstance } from '@module/test-instance/entities/test-instance.entity';
import { TestInstanceQuestion } from '@module/test-instance-question/entities/test-instance-question.entity';

export enum TestInstanceResultStatus {
  CREATED = 'created',
  CORRECTLY_ANSWERED = 'correctly_answered',
  INCORRECTLY_ANSWERED = 'incorrectly_answered',
}

@Entity()
export class TestInstanceResult {
  @PrimaryColumn({ type: 'varchar', length: 36 })
  public id: string;
  @ManyToOne(() => TestInstance, (instance) => instance.results)
  public instance: TestInstance;
  @Column({ type: 'integer', nullable: false, unique: true })
  public learnerNumber: number;
  @OneToMany(() => LearnerAccount, (learnerAccount) => learnerAccount.testInstanceResults)
  public learner: LearnerAccount;
  @ManyToOne(() => TestInstanceQuestion, (instanceQuestion) => instanceQuestion.instanceResults)
  public question: TestInstanceQuestion;
  @Column({ type: 'varchar', array: true, nullable: false })
  public answers: string[];
  @Column({ type: 'integer', nullable: false })
  public correctAnswerIndex: number;
  @Column({ type: 'integer', nullable: false })
  public submittedAnswerIndex: number;
  @Column({ type: 'enum', enum: TestInstanceResultStatus, nullable: false })
  public status: TestInstanceResultStatus;
  @Column({ type: 'timestamp', nullable: true })
  public submittedAt: Date;
  @Column({ type: 'timestamp', nullable: false })
  public updatedAt: Date;
  @Column({ type: 'timestamp', nullable: false })
  public createdAt: Date;
}
