import { Column, Entity, OneToMany, PrimaryColumn, Unique } from 'typeorm';

import { randomUUID } from 'crypto';

import { TestSchema } from '@module/test-schema/entities/test-schema.entity';

export type SubjectCreateProps = Pick<Subject, 'name' | 'fieldOfStudy'>;

export type SubjectUpdateProps = Partial<SubjectCreateProps>;

@Entity()
@Unique(['name', 'fieldOfStudy'])
export class Subject {
  @PrimaryColumn({ type: 'varchar', length: 36 })
  public id: string;
  @Column({ type: 'varchar', length: 250, nullable: false })
  public name: string;
  @Column({ type: 'varchar', length: 50, nullable: false })
  public fieldOfStudy: string;
  @OneToMany(() => TestSchema, (testSchema) => testSchema.subject)
  public testSchemas: TestSchema[];
  @Column({ type: 'timestamp', nullable: false })
  public updatedAt: Date;
  @Column({ type: 'timestamp', nullable: false })
  public createdAt: Date;

  public static create(props: SubjectCreateProps): Subject {
    const now = new Date();
    const subject = new Subject();

    Object.assign(subject, {
      id: randomUUID(),
      name: props.name,
      fieldOfStudy: props.fieldOfStudy,
      testSchemas: [],
      updatedAt: now,
      createdAt: now,
    });

    return subject;
  }

  public update(props: SubjectUpdateProps): void {
    Object.assign(this, props);

    this.updatedAt = new Date();
  }
}
