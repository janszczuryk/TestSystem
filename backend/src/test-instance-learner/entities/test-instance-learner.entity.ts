import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn, Unique } from 'typeorm';

import { LearnerAccount } from '@module/account/entities/learner-account.entity';
import { TestInstance } from '@module/test-instance/entities/test-instance.entity';
import { TestInstanceLearnerAnswer } from '@module/test-instance-learner-answer/entities/test-instance-learner-answer.entity';

export type TestInstanceLearnerCreateProps = Pick<TestInstanceLearner, 'instance' | 'learner' | 'learnerNumber'>;

export type TestInstanceLearnerUpdateProps = Partial<TestInstanceLearnerCreateProps>;

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

  public static create(props: TestInstanceLearnerCreateProps): TestInstanceLearner {
    const now = new Date();
    const testInstanceLearner = new TestInstanceLearner();

    Object.assign(testInstanceLearner, {
      instanceId: props.instance.id,
      learnerId: props.learner.id,
      instance: props.instance,
      learner: props.learner,
      learnerNumber: props.learnerNumber,
      answers: [],
      status: TestInstanceLearnerStatus.JOINED,
      updatedAt: now,
      createdAt: now,
    });

    return testInstanceLearner;
  }

  public update(props: TestInstanceLearnerUpdateProps): void {
    Object.assign(this, props);

    this.updatedAt = new Date();
  }

  public start(): void {
    const now = new Date();

    this.status = TestInstanceLearnerStatus.STARTED;
    this.startedAt = now;
    this.updatedAt = now;
  }

  public finish(): void {
    const now = new Date();

    this.status = TestInstanceLearnerStatus.FINISHED;
    this.finishedAt = now;
    this.updatedAt = now;
  }

  public isJoined(): boolean {
    return this.status === TestInstanceLearnerStatus.JOINED;
  }

  public isStarted(): boolean {
    return this.status === TestInstanceLearnerStatus.STARTED;
  }

  public isFinished(): boolean {
    return this.status === TestInstanceLearnerStatus.FINISHED;
  }
}
