import { UserRole } from '../../../shared/enums/user-role.enum';
import { Company } from '../../companies/entities/company.entity';
import {
  IsString,
  IsEmail,
  IsEnum,
  IsOptional,
  IsBoolean,
  IsDate,
} from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Name must be a string' })
  name!: string;

  @IsEmail({}, { message: 'Email must be a valid email address' })
  email!: string;

  @IsString({ message: 'Password must be a string' })
  password!: string;

  @IsEnum(UserRole, { message: 'Role must be a valid UserRole' })
  role!: UserRole;

  @IsOptional()
  @IsString({ message: 'Company ID must be a string' })
  companyId?: string;

  @IsOptional()
  company?: Company;

  @IsBoolean({ message: 'isActive must be a boolean' })
  isActive!: boolean;

  @IsDate({ message: 'createdAt must be a valid date' })
  createdAt!: Date;

  @IsDate({ message: 'updatedAt must be a valid date' })
  updatedAt!: Date;
}
