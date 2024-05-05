import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { TestSchema } from '../../test-schema/entities/test-schema.entity';

@Entity()
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
}
