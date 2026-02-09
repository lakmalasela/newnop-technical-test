import { IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
import { IssueStatus} from '../enum/Issue-status.enum'
import { IssuePriority } from '../enum/Issue-priority.enum'



export class FilterIssuesDto {
  @IsOptional()
  title?: string;

  @IsOptional()
  @IsEnum(IssueStatus)
  status?: IssueStatus;

  @IsOptional()
  @IsEnum(IssuePriority)
  priority?: IssuePriority;

  @IsOptional()
  page?: number = 1;

  @IsOptional()
  limit?: number = 10;
}
