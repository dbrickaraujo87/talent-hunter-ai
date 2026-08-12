import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectIdColumn,
} from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity('jobs')
export class Job {
  @ObjectIdColumn()
  _id!: ObjectId;

  @Column({ nullable: true })
  id!: string;

  @Column({ nullable: false })
  title!: string;

  @Column({ nullable: false })
  description!: string;

  @Column({ nullable: false })
  salary!: number;

  @Column({ nullable: false })
  location!: string;

  @Column({ nullable: false })
  seniority!: string;

  @Column('simple-array')
  requiredSkills!: string[];

  @Column({ nullable: false })
  companyId!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
