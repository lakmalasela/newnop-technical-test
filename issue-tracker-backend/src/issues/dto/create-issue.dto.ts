import { IsNotEmpty, IsOptional } from 'class-validator';
import { IssuePriority } from '../enum/Issue-priority.enum';

export class CreateIssueDto {

  @IsNotEmpty()
  title: string;

  @IsOptional()
  description: string;

  @IsOptional()
  priority: IssuePriority;
}
