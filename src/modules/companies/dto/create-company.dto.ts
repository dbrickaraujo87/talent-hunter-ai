import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateCompanyDto {
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty()
  name!: string;

  @IsString({ message: 'CNPJ must be a string' })
  @IsNotEmpty({ message: 'CNPJ must not be empty' })
  cnpj!: string;

  @IsString({ message: 'Website must be a string' })
  @IsNotEmpty({ message: 'Website must not be empty' })
  website!: string;

  @IsString({ message: 'Logo URL must be a string' })
  @IsNotEmpty({ message: 'Logo URL must not be empty' })
  @IsUrl({})
  logoUrl!: string;

  @IsBoolean({ message: 'isActive must be a boolean' })
  isActive!: boolean;

  @IsDate({ message: 'createdAt must be a valid date' })
  createdAt!: Date;

  @IsDate({ message: 'updatedAt must be a valid date' })
  updatedAt!: Date;
}
