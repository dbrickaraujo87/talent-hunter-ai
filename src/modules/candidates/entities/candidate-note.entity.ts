import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Candidate } from './candidate.entity';
import { Company } from '../../companies/entities/company.entity';

@Entity('candidate_notes')
export class CandidateNote {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ nullable: false })
  candidateId!: string;

  @ManyToOne(() => Candidate, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'candidateId' })
  candidate?: Candidate;

  @Column({ nullable: false })
  companyId!: string;

  @ManyToOne(() => Company, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'companyId' })
  company?: Company;

  @Column({ nullable: false })
  authorId!: string; // ID do recrutador que fez a nota

  @Column({ type: 'text', nullable: false })
  note!: string; // Ex: "Excelente comunicação técnica, pediu pretensão de X"

  @Column({ default: false })
  isFavorite!: boolean; // Marcar como favorito no banco interno

  @Column('simple-array', { nullable: true })
  tags?: string[]; // Ex: ["Sênior", "Inglês Fluente", "Forte em Postgres"]

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
