export class CreateJobDto {
  title!: string;
  description!: string;
  salary!: number;
  location!: string;
  seniority!: string;
  requiredSkills!: string[];
  companyId!: string;
}
