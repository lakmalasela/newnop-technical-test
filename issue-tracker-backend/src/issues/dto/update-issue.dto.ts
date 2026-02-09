import { IsOptional } from 'class-validator';
import { IssueStatus } from '../enum/Issue-status.enum'
import { IssuePriority } from '../enum/Issue-priority.enum'

export class UpdateIssueDto {

  @IsOptional()
  title: string;

  @IsOptional()
  description: string;

  @IsOptional()
  status: IssueStatus;

  @IsOptional()
  priority: IssuePriority;

  userId: string;
}
