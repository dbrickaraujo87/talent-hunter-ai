import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('jobs')
export class Job {
  @PrimaryGeneratedColumn('uuid')
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
