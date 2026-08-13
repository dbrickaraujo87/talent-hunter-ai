import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum RemovalStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  REJECTED = 'REJECTED',
}

@Entity('data_removal_requests')
export class DataRemovalRequest {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ nullable: true })
  candidateId?: string; // ID do candidato (pode ficar nulo após a exclusão dos dados)

  @Column({ nullable: false })
  candidateEmail!: string; // Email do titular para registro legal de auditoria

  @Column({
    type: 'enum',
    enum: RemovalStatus,
    default: RemovalStatus.PENDING,
  })
  status!: RemovalStatus;

  @Column({ nullable: true })
  requestedBy?: string; // Ex: "Solicitação via Titular", "Formulário Web"

  @Column({ nullable: true })
  processedByUserId?: string; // ID do Administrador que aprovou/processou

  @Column({ type: 'text', nullable: true })
  proofLog?: string; // Evidência ou relatório textual da remoção efetuada

  @Column({ type: 'timestamp', nullable: true })
  processedAt?: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
