import { Body, Controller, Get, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { IssueService } from './issue.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RoleGuard } from 'src/auth/guard/role.guard';
import { CreateIssueDto } from './dto/create-issue.dto';
import { BaseResponse } from 'src/common/response/base.response';
import { User } from 'src/decorator/roles.decorator';
import { IssueResponse } from './dto/response/issue.response';
import { UpdateIssueDto } from './dto/update-issue.dto';
import { IssueStatus } from './enum/Issue-status.enum';

@Controller('isssue')
export class IsssueController {

constructor(private readonly service: IssueService) {}

  //create issue endpoint
    @UseGuards(JwtAuthGuard,RoleGuard)
    @Post()
    async create(@Body() dto: CreateIssueDto, @User('userId') userId: string):Promise<BaseResponse<IssueResponse>>  {

    try {

      const result = await this.service.create(dto, userId);

      return new BaseResponse(true, 'Issue Created', result);

    } catch (error) {
      return new BaseResponse(false, error.message);
    }
  }


  //update issue endpoint
  @UseGuards(JwtAuthGuard,RoleGuard)
  @Put(':id')
  async updateIssue(@Param('id') id: string, @Body() dto: UpdateIssueDto, @User('userId') userId: string): Promise<BaseResponse<IssueResponse>> {
    
    try {
      const result = await this.service.updateIssue(id, dto, userId);
      return new BaseResponse(true, 'Issue Updated', result);
    } catch(error) {
      return new BaseResponse(false, error.message);
    }
  }
  

  //get all issues endpoint
  @Get()
  @UseGuards(JwtAuthGuard,RoleGuard)
  async findAll(@Query('search') search?: string,
  @Query('page') page?: number,
  @Query('limit') limit?: number,
  @User('userId') userId?: string,
  @User('role') userRole?: string):Promise<BaseResponse<{ data: IssueResponse[]; total: number; page: number; limit: number; }>>{
    try {
    const result = await this.service.findAllIssues(search, Number(page) || 1, Number(limit) || 10, userId, userRole);
    return new BaseResponse(true, 'Issue List', result);
  } catch (error) {
    return new BaseResponse(false, error.message);
  }
  }


  //mark as resolved or closed endpoint
  @Patch(':id/status')
  @UseGuards(JwtAuthGuard,RoleGuard)
  async updateIssueStatus(@Param('id') id: string, @Body('status') status: IssueStatus, @User('userId') userId: string): Promise<BaseResponse<IssueResponse>> {
    try {
      //only RESOLVED or CLOSED status is allowed
      if (status !== IssueStatus.RESOLVED && status !== IssueStatus.CLOSED) {
        throw new Error('Only RESOLVED or CLOSED status are allowed');
      }
      
      const result = await this.service.markAsResolveOrClose(id, status, userId);
      const statusMessage = status === IssueStatus.RESOLVED ? 'Resolved' : 'Closed';
      return new BaseResponse(true, `Issue marked as ${statusMessage}`, result);
    } catch(error) {
      return new BaseResponse(false, error.message);
    }
  }

  //find issue get by id
  @Get(':id')
  @UseGuards(JwtAuthGuard,RoleGuard)
  async getIssueById(@Param('id') id:string):Promise<BaseResponse<IssueResponse>>{

    try{
      const result = await this.service.getIssueById(id);
      return new BaseResponse(true, 'Issue Found', result);
    }catch(error){
      return new BaseResponse(false, error.message);
    }
  }

}



