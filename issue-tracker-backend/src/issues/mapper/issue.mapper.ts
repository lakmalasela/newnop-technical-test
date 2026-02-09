import { IssueEntity } from '../entity/Issue.entity';
import { IssueResponse } from '../dto/response/issue.response';
import { CreateIssueDto } from '../dto/create-issue.dto';
import { UpdateIssueDto } from '../dto/update-issue.dto';
import { IssueStatus } from '../enum/Issue-status.enum';
import { IssuePriority } from '../enum/Issue-priority.enum';
import { UserEntity } from 'src/users/entity/user.entity';

export class IssueMapper {


  static toResponse(entity: IssueEntity): IssueResponse {
    return {
      id: entity.id,
      title: entity.title,
      description: entity.description,
      status: entity.status,
      priority: entity.priority,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  static toResponseList(entities: IssueEntity[]): IssueResponse[] {
    return entities.map(e => this.toResponse(e));
  }

  static toEntity(dto: CreateIssueDto, userId: string): IssueEntity {

    const entity = new IssueEntity();

    entity.title = dto.title;
    entity.description = dto.description;
    entity.priority = dto.priority ?? IssuePriority.MEDIUM;
    entity.status = IssueStatus.OPEN;

    const user = new UserEntity();
    user.id = userId;
    entity.user = user;

    return entity;
  }

  static updateEntity(entity: IssueEntity, dto: UpdateIssueDto): IssueEntity {

    if (dto.title !== undefined)
      entity.title = dto.title;

    if (dto.description !== undefined)
      entity.description = dto.description;

    if (dto.priority !== undefined)
      entity.priority = dto.priority;

    if (dto.status !== undefined)
      entity.status = dto.status;

    //update the timestamp
    entity.updatedAt = new Date();
    return entity;
  }
}
