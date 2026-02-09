import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IssueService } from './issue.service';
import { IsssueController } from './isssue.controller';
import { IssueEntity } from './entity/Issue.entity';
import { UserEntity } from 'src/users/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([IssueEntity, UserEntity])],
  providers: [IssueService],
  controllers: [IsssueController]
})
export class IssuesModule {}
