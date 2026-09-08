import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCandidateDto {
  @IsString({ message: 'Name must be a string' })
  @ApiProperty()
  name!: string;

  @IsString({ message: 'Email must be a string' })
  @ApiProperty()
  email!: string;

  @IsString({ message: 'Phone must be a string' })
  @ApiProperty()
  phone!: string;

  @IsString({ message: 'Resume URL must be a string' })
  @ApiProperty({ required: false })
  resumeUrl?: string;

  @IsString({ message: 'Portfolio URL must be a string' })
  @ApiProperty()
  githubUrl!: string;

  @IsString({ message: 'LinkedIn URL must be a string' })
  @ApiProperty()
  linkedinUrl!: string;
}
