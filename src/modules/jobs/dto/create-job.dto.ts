import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsArray, IsNotEmpty } from 'class-validator';

export class CreateJobDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Title is required' })
  @IsString({ message: 'Title must be a string' })
  title!: string;

  @ApiProperty()
  @IsString({ message: 'Description must be a string' })
  description!: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Salary is required' })
  @IsNumber({}, { message: 'Salary must be a number' })
  salary!: number;

  @ApiProperty()
  @IsString({ message: 'Location must be a string' })
  location!: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Seniority is required' })
  @IsString({ message: 'Seniority must be a string' })
  seniority!: string;

  @ApiProperty({ type: [String] })
  @IsNotEmpty({ message: 'Required skills are required' })
  @IsArray({ message: 'Required skills must be an array' })
  @IsString({ each: true, message: 'Each required skill must be a string' })
  requiredSkills!: string[];

  @ApiProperty()
  @IsString({ message: 'Company ID must be a string' })
  companyId!: string;
}
