import {
  Entity,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Company } from '../../modules/companies/entities/company.entity';

@Entity('audit_logs')
export class AuditLog {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ nullable: true })
  userId?: string;

  @Column({ nullable: true })
  companyId?: string;

  @ManyToOne(() => Company, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'companyId' })
  company?: Company;

  @Column({ nullable: false })
  action!: string; // Ex: 'USER_LOGIN', 'JOB_CREATED', 'HUNTER_SEARCH_STARTED', 'OUTREACH_SENT'

  @Column({ nullable: true })
  resource?: string; // Ex: 'jobs', 'candidates', 'outreaches'

  @Column({ nullable: true })
  resourceId?: string;

  @Column({ type: 'json', nullable: true })
  details?: Record<string, any>;

  @CreateDateColumn()
  createdAt!: Date;
}
