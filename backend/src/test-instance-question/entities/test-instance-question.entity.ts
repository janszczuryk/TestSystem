import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';

import { TestInstance } from '@module/test-instance/entities/test-instance.entity';
import { TestInstanceResult } from '@module/test-instance-result/entities/test-instance-result.entity';
import { TestSchemaQuestion } from '@module/test-schema-question/entities/test-schema-question.entity';

@Entity()
export class TestInstanceQuestion {
  @PrimaryColumn({ type: 'varchar', length: 36 })
  public id: string;
  @ManyToOne(
    () => TestSchemaQuestion,
    (schemaQuestion) => schemaQuestion.instanceQuestions,
  )
  public schemaQuestion: TestSchemaQuestion;
  @ManyToOne(() => TestInstance, (instance) => instance.questionsPool)
  public instance: TestInstance;
  @OneToMany(
    () => TestInstanceResult,
    (instanceResult) => instanceResult.question,
  )
  public instanceResults: TestInstanceResult[];
  @Column({ type: 'varchar', length: 250, nullable: false })
  public question: string;
  @Column({ type: 'varchar', array: true, nullable: false })
  public answers: string[];
  @Column({ type: 'integer', nullable: false })
  public correctAnswerIndex: number;
  @Column({ type: 'timestamp', nullable: false })
  public updatedAt: Date;
  @Column({ type: 'timestamp', nullable: false })
  public createdAt: Date;
}
