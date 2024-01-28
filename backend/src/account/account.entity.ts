import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Account {
  @PrimaryColumn({ type: 'text', width: 36 })
  public id: string;
  @Column({ type: 'text', width: 100, nullable: false })
  public firstName: string;
  @Column({ type: 'text', width: 100, nullable: false })
  public lastName: string;
}
