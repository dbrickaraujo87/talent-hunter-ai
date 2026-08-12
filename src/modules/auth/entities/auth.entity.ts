import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { hash, compare } from 'bcrypt'; // Import bcrypt for password hashing
import { UserRole } from '../../../shared/enums/user-role.enum'; // Import the UserRoles enum
import { Company } from '../../companies/entities/company.entity';

@Entity('auth')
export class Auth {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ nullable: false })
  password!: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.RECRUITER })
  role!: UserRole; // Array de strings para armazenar os papéis do usuário

  @Column({ nullable: true })
  companyId!: string | null; // ID da empresa associada ao usuário (opcional)

  @Column({ nullable: false })
  name!: string; // Nome do usuário

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(password: string): Promise<void> {
    if (this.password) {
      this.password = await hash(this.password, 10); // Hash the password with a salt round of 10
    }
  }
}
