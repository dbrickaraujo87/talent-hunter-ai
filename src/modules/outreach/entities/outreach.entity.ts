import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Job } from '../../jobs/entities/job.entity';
import { Candidate } from '../../candidates/entities/candidate.entity';

export enum OutreachStatus {
  DRAFT = 'DRAFT', // Mensagem gerada pela IA, aguardando revisão do RH
  SENT = 'SENT', // Mensagem enviada ao candidato
  REPLIED = 'REPLIED', // Candidato respondeu
  DECLINED = 'DECLINED', // Candidato recusou
}

@Entity('outreaches')
export class Outreach {
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

  @Column({ type: 'text', nullable: true })
  generatedMessage?: string; // Mensagem sugerida pela IA

  @Column({ type: 'text', nullable: true })
  sentMessage?: string; // Mensagem revisada e enviada pelo recrutador

  @Column({
    type: 'enum',
    enum: OutreachStatus,
    default: OutreachStatus.DRAFT,
  })
  status!: OutreachStatus;

  @Column({ type: 'timestamp', nullable: true })
  sentAt?: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
