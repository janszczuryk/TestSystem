import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn, Unique } from 'typeorm';

import { LearnerAccount } from '@module/account/entities/learner-account.entity';
import { TestInstance } from '@module/test-instance/entities/test-instance.entity';
import { TestInstanceLearnerAnswer } from '@module/test-instance-learner-answer/entities/test-instance-learner-answer.entity';

export enum TestInstanceLearnerStatus {
  JOINED = 'joined',
  STARTED = 'started',
  FINISHED = 'finished',
}

@Entity()
@Unique(['instance', 'learnerNumber'])
export class TestInstanceLearner {
  @PrimaryColumn({ type: 'varchar', length: 36 })
  public instanceId: string;
  @PrimaryColumn({ type: 'varchar', length: 36 })
  public learnerId: string;
  @ManyToOne(() => TestInstance, (testInstance) => testInstance.learners, { onDelete: 'CASCADE' })
  public instance: TestInstance;
  @ManyToOne(() => LearnerAccount, (learnerAccount) => learnerAccount.testInstanceLearners)
  public learner: LearnerAccount;
  @Column({ type: 'integer', nullable: false })
  public learnerNumber: number;
  @OneToMany(() => TestInstanceLearnerAnswer, (testInstanceLearnerAnswer) => testInstanceLearnerAnswer.instanceLearner)
  public answers: TestInstanceLearnerAnswer[];
  @Column({ type: 'enum', enum: TestInstanceLearnerStatus, nullable: false })
  public status: TestInstanceLearnerStatus;
  @Column({ type: 'timestamp', nullable: true })
  public startedAt?: Date;
  @Column({ type: 'timestamp', nullable: true })
  public finishedAt?: Date;
  @Column({ type: 'timestamp', nullable: false })
  public updatedAt: Date;
  @Column({ type: 'timestamp', nullable: false })
  public createdAt: Date;
}
