import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { Subject } from '../../subject/entities/subject.entity';
import { TestSchemaQuestion } from '../../test-schema-question/entities/test-schema-question.entity';
import { TestInstance } from '../../test-instance/entities/test-instance.entity';

@Entity()
export class TestSchema {
  @PrimaryColumn({ type: 'varchar', length: 36 })
  public id: string;
  @Column({ type: 'varchar', length: 250, nullable: false })
  public name: string;
  @ManyToOne(() => Subject, (subject) => subject.testSchemas)
  public subject: Subject;
  @OneToMany(() => TestSchemaQuestion, (question) => question.schema)
  public questions: TestSchemaQuestion[];
  @OneToMany(() => TestInstance, (instance) => instance.schema)
  public instances: TestInstance[];
  @Column({ type: 'timestamp', nullable: false })
  public updatedAt: Date;
  @Column({ type: 'timestamp', nullable: false })
  public createdAt: Date;
}
