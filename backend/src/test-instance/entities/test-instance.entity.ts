import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';

import { randomUUID } from 'crypto';

import { TeacherAccount } from '@module/account/entities/teacher-account.entity';
import { TestInstanceQuestion } from '@module/test-instance-question/entities/test-instance-question.entity';
import { TestInstanceResult } from '@module/test-instance-result/entities/test-instance-result.entity';
import { TestSchema } from '@module/test-schema/entities/test-schema.entity';

export type TestInstanceCreateProps = Pick<TestInstance, 'schema' | 'questionsCount' | 'isEnabled' | 'teacher'>;

export type TestInstanceUpdateProps = Partial<TestInstanceCreateProps>;

export enum TestInstanceStatus {
  CREATED = 'created',
  STARTED = 'started',
  ENDED = 'ended',
}

@Entity()
export class TestInstance {
  @PrimaryColumn({ type: 'varchar', length: 36 })
  public id: string;
  @ManyToOne(() => TestSchema, (schema) => schema.instances)
  public schema: TestSchema;
  @Column({ type: 'integer', nullable: false })
  public questionsCount: number;
  @OneToMany(() => TestInstanceQuestion, (instanceQuestion) => instanceQuestion.instance)
  public questionsPool: TestInstanceQuestion[];
  @Column({ type: 'boolean', nullable: false })
  public isEnabled: boolean;
  @Column({ type: 'enum', enum: TestInstanceStatus, nullable: false })
  public status: TestInstanceStatus;
  @Column({ type: 'timestamp', nullable: true })
  public startedAt?: Date;
  @Column({ type: 'timestamp', nullable: true })
  public endedAt?: Date;
  @ManyToOne(() => TeacherAccount, (teacherAccount) => teacherAccount.testInstances)
  public teacher: TeacherAccount;
  @OneToMany(() => TestInstanceResult, (result) => result.instance)
  public results: TestInstanceResult[];
  @Column({ type: 'timestamp', nullable: false })
  public updatedAt: Date;
  @Column({ type: 'timestamp', nullable: false })
  public createdAt: Date;

  public static create(props: TestInstanceCreateProps): TestInstance {
    const now = new Date();
    const testInstance = new TestInstance();

    Object.assign(testInstance, {
      id: randomUUID(),
      schema: props.schema,
      questionsCount: props.questionsCount,
      questionsPool: [],
      isEnabled: props.isEnabled,
      status: TestInstanceStatus.CREATED,
      teacher: props.teacher,
      results: [],
      updatedAt: now,
      createdAt: now,
    });

    return testInstance;
  }

  public update(props: TestInstanceUpdateProps): void {
    Object.assign(this, props);

    this.updatedAt = new Date();
  }

  public start(): void {
    this.status = TestInstanceStatus.STARTED;
    this.startedAt = new Date();

    this.updatedAt = new Date();
  }

  public end(): void {
    this.status = TestInstanceStatus.ENDED;
    this.endedAt = new Date();

    this.updatedAt = new Date();
  }

  public isCreated(): boolean {
    return this.status === TestInstanceStatus.CREATED;
  }

  public isStarted(): boolean {
    return this.status === TestInstanceStatus.STARTED;
  }

  public isEnded(): boolean {
    return this.status === TestInstanceStatus.ENDED;
  }
}
