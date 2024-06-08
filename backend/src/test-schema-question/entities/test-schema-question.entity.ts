import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';

import { randomUUID } from 'crypto';

import { TestInstanceQuestion } from '@module/test-instance-question/entities/test-instance-question.entity';
import { TestSchema } from '@module/test-schema/entities/test-schema.entity';

export type TestSchemaQuestionCreateProps = Pick<
  TestSchemaQuestion,
  'question' | 'answers' | 'correctAnswerIndex' | 'schema'
>;

export type TestSchemaQuestionUpdateProps = Partial<TestSchemaQuestionCreateProps>;

@Entity()
export class TestSchemaQuestion {
  @PrimaryColumn({ type: 'varchar', length: 36 })
  public id: string;
  @Column({ type: 'varchar', length: 250, nullable: false })
  public question: string;
  @Column({ type: 'varchar', array: true, nullable: false })
  public answers: string[];
  @Column({ type: 'integer', nullable: false })
  public correctAnswerIndex: number;
  @ManyToOne(() => TestSchema, (schema) => schema.questions)
  public schema: TestSchema;
  @OneToMany(() => TestInstanceQuestion, (instanceQuestion) => instanceQuestion.schemaQuestion)
  public instanceQuestions: TestInstanceQuestion[];
  @Column({ type: 'timestamp', nullable: false })
  public updatedAt: Date;
  @Column({ type: 'timestamp', nullable: false })
  public createdAt: Date;

  public static create(props: TestSchemaQuestionCreateProps): TestSchemaQuestion {
    const now = new Date();
    const testSchemaQuestion = new TestSchemaQuestion();

    Object.assign(testSchemaQuestion, {
      id: randomUUID(),
      question: props.question,
      answers: props.answers,
      correctAnswerIndex: props.correctAnswerIndex,
      schema: props.schema,
      instanceQuestions: [],
      updatedAt: now,
      createdAt: now,
    });

    return testSchemaQuestion;
  }

  public update(props: TestSchemaQuestionUpdateProps): void {
    Object.assign(this, props);

    this.updatedAt = new Date();
  }
}
