import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Job } from '../../jobs/entities/job.entity';
import { Candidate } from '../../candidates/entities/candidate.entity';

@Entity('matchings')
export class Matching {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ nullable: false })
  jobId!: string;

  @ManyToOne(() => Job, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'jobId' })
  job?: Job;

  @Column({ nullable: false })
  candidateId!: string;

  @ManyToOne(() => Candidate, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'candidateId' })
  candidate?: Candidate;

  @Column({ type: 'float', nullable: false })
  score!: number; // Nota de 0 a 100

  @Column({ type: 'text', nullable: true })
  justification?: string; // Explicativa da IA sobre o match

  @Column('simple-array', { nullable: true })
  matchedSkills?: string[];

  @Column('simple-array', { nullable: true })
  missingSkills?: string[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
