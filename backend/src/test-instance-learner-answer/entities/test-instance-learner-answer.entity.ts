import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';

import { randomUUID } from 'crypto';

import { TestInstanceLearner } from '@module/test-instance-learner/entities/test-instance-learner.entity';
import { TestInstanceQuestion } from '@module/test-instance-question/entities/test-instance-question.entity';

export type TestInstanceLearnerAnswerCreateProps = Pick<
  TestInstanceLearnerAnswer,
  'instanceLearner' | 'instanceQuestion'
>;

export enum TestInstanceLearnerAnswerStatus {
  CREATED = 'created',
  SHOWN = 'shown',
  CORRECT_ANSWER_SUBMITTED = 'correct_answer_submitted',
  INCORRECT_ANSWER_SUBMITTED = 'incorrect_answer_submitted',
}

@Entity()
export class TestInstanceLearnerAnswer {
  @PrimaryColumn({ type: 'varchar', length: 36 })
  public id: string;
  @Column({ type: 'varchar', length: 36, nullable: false })
  public instanceLearnerInstanceId: string;
  @Column({ type: 'varchar', length: 36, nullable: false })
  public instanceLearnerLearnerId: string;
  @ManyToOne(() => TestInstanceLearner, (testInstanceLearner) => testInstanceLearner.answers, { onDelete: 'CASCADE' })
  public instanceLearner: TestInstanceLearner;
  @ManyToOne(() => TestInstanceQuestion, (testInstanceQuestion) => testInstanceQuestion.instanceLearnerAnswers, {
    onDelete: 'CASCADE',
  })
  public instanceQuestion: TestInstanceQuestion;
  @Column({ type: 'enum', enum: TestInstanceLearnerAnswerStatus, nullable: false })
  public status: TestInstanceLearnerAnswerStatus;
  @Column({ type: 'integer', nullable: true })
  public submittedAnswerIndex?: number;
  @Column({ type: 'timestamp', nullable: true })
  public shownAt?: Date;
  @Column({ type: 'timestamp', nullable: true })
  public answerSubmittedAt?: Date;
  @Column({ type: 'timestamp', nullable: false })
  public updatedAt: Date;
  @Column({ type: 'timestamp', nullable: false })
  public createdAt: Date;

  public static create(props: TestInstanceLearnerAnswerCreateProps): TestInstanceLearnerAnswer {
    const now = new Date();
    const testInstanceLearnerAnswer = new TestInstanceLearnerAnswer();

    Object.assign(testInstanceLearnerAnswer, {
      id: randomUUID(),
      instanceLearnerInstanceId: props.instanceLearner.instanceId,
      instanceLearnerLearnerId: props.instanceLearner.learnerId,
      instanceLearner: props.instanceLearner,
      instanceQuestion: props.instanceQuestion,
      status: TestInstanceLearnerAnswerStatus.CREATED,
      updatedAt: now,
      createdAt: now,
    });

    return testInstanceLearnerAnswer;
  }

  public show(): void {
    const now = new Date();

    this.status = TestInstanceLearnerAnswerStatus.SHOWN;
    this.shownAt = now;
    this.updatedAt = now;
  }

  public submitAnswer(correctAnswerIndex: number, submittedAnswerIndex: number): void {
    const now = new Date();

    this.submittedAnswerIndex = submittedAnswerIndex;
    this.status =
      correctAnswerIndex === submittedAnswerIndex
        ? TestInstanceLearnerAnswerStatus.CORRECT_ANSWER_SUBMITTED
        : TestInstanceLearnerAnswerStatus.INCORRECT_ANSWER_SUBMITTED;
    this.answerSubmittedAt = now;
    this.updatedAt = now;
  }
}
