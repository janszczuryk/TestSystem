import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';

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

  public update(props: TestSchemaQuestionUpdateProps): void {
    Object.assign(this, props);

    this.updatedAt = new Date();
  }
}
