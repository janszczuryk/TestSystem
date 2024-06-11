import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';

import { randomUUID } from 'crypto';

import { TestInstance } from '@module/test-instance/entities/test-instance.entity';
import { TestInstanceLearnerAnswer } from '@module/test-instance-learner-answer/entities/test-instance-learner-answer.entity';
import { TestSchemaQuestion } from '@module/test-schema-question/entities/test-schema-question.entity';

export type TestInstanceQuestionCreateProps = Pick<
  TestInstanceQuestion,
  'schemaQuestion' | 'instance' | 'question' | 'answers' | 'correctAnswerIndex'
>;

export type TestInstanceQuestionUpdateProps = Partial<TestInstanceQuestionCreateProps>;

@Entity()
export class TestInstanceQuestion {
  @PrimaryColumn({ type: 'varchar', length: 36 })
  public id: string;
  @ManyToOne(() => TestSchemaQuestion, (schemaQuestion) => schemaQuestion.instanceQuestions, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  public schemaQuestion?: TestSchemaQuestion;
  @ManyToOne(() => TestInstance, (instance) => instance.questionsPool, { onDelete: 'CASCADE' })
  public instance: TestInstance;
  @Column({ type: 'varchar', length: 250, nullable: false })
  public question: string;
  @Column({ type: 'varchar', array: true, nullable: false })
  public answers: string[];
  @Column({ type: 'integer', nullable: false })
  public correctAnswerIndex: number;
  @OneToMany(() => TestInstanceLearnerAnswer, (testInstanceLeanerAnswer) => testInstanceLeanerAnswer.instanceQuestion)
  public instanceLearnerAnswers: TestInstanceLearnerAnswer[];
  @Column({ type: 'timestamp', nullable: false })
  public updatedAt: Date;
  @Column({ type: 'timestamp', nullable: false })
  public createdAt: Date;

  public static create(props: TestInstanceQuestionCreateProps): TestInstanceQuestion {
    const now = new Date();
    const testInstanceQuestion = new TestInstanceQuestion();

    Object.assign(testInstanceQuestion, {
      id: randomUUID(),
      schemaQuestion: props.schemaQuestion,
      instance: props.instance,
      question: props.question,
      answers: props.answers,
      correctAnswerIndex: props.correctAnswerIndex,
      instanceLearnerAnswers: [],
      updatedAt: now,
      createdAt: now,
    });

    return testInstanceQuestion;
  }
}
