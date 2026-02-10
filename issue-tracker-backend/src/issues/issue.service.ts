import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IssueEntity } from './entity/Issue.entity';
import { Repository } from 'typeorm';
import { CreateIssueDto } from './dto/create-issue.dto';
import { IssueMapper } from './mapper/issue.mapper';
import { IssueResponse } from './dto/response/issue.response';
import { CommonException } from 'src/common/exception/common.exception';
import { UpdateIssueDto } from './dto/update-issue.dto';
import { HttpStatus } from '@nestjs/common';
import { IssueStatus } from './enum/Issue-status.enum';
import { Like, And, Or } from 'typeorm';
import { UserEntity } from 'src/users/entity/user.entity';
@Injectable()
export class IssueService {


     constructor( @InjectRepository(IssueEntity)private Issuerepository: Repository<IssueEntity>,@InjectRepository(UserEntity)private userRepository:Repository<UserEntity>) {}

    //create issue
     async create(dto: CreateIssueDto, userId: string): Promise<IssueResponse> {

        try{
            const entity = IssueMapper.toEntity(dto, userId);
            const saved = await this.Issuerepository.save(entity);
             return IssueMapper.toResponse(saved);
        }catch(error){
           throw new CommonException(error.message);
        }
     }


     //find All issues
     async findAllIssues(search?:string,page?:number,limit?:number,userId?:string,userRole?:string,sortBy?:string,sortOrder?:'ASC' | 'DESC'):Promise<{data: IssueResponse[], total: number, page: number, limit: number}> {
        try {
            const currentPage = page || 1;
            const currentPageSize = limit || 10;
            const sortField = sortBy || 'createdAt';
            const order = sortOrder || 'DESC';
            
            const skip = (currentPage - 1) * currentPageSize;
            
            let searchCriteria: any = {};   

            if (search) {
                searchCriteria = [
                    { title: Like(`%${search}%`) },
                    { priority: Like(`%${search}%`) },
                    { status: Like(`%${search}%`) }
                ];
            }

            // If user is not admin, filter by user's created issues only
            if (userRole !== 'ADMIN' && userId) {
                if (search) {
                    // Combine search criteria with user filter
                    searchCriteria = [
                        { title: Like(`%${search}%`), user: { id: userId } },
                        { priority: Like(`%${search}%`), user: { id: userId } },
                        { status: Like(`%${search}%`), user: { id: userId } }
                    ];
                } else {
                    searchCriteria = { user: { id: userId } };
                }
            }

            const [issues, total] = await this.Issuerepository.findAndCount({
                where: searchCriteria,
                relations: ['user'],
                order: {
                    [sortField]: order
                },
                skip: skip,
                take: currentPageSize
            });

            return {
                data: IssueMapper.toResponseList(issues),
                total,
                page: currentPage,
                limit: currentPageSize
            };
            
        } catch (error) {
            throw new CommonException(error.message);
        }
     }

     //update issue
     async updateIssue(id:string,dto:UpdateIssueDto,userId:string):Promise<IssueResponse>{

        try{

            const user = this.userRepository.findOneBy({id:userId});
            if(!user){
                throw new CommonException('User not found can not update issue',HttpStatus.NOT_FOUND);
            }    
            const issue = await this.Issuerepository.findOneBy({id});
            if(!issue){
                throw new CommonException('Issue not found',HttpStatus.NOT_FOUND);
            }

            const updateEntity = IssueMapper.updateEntity(issue,dto);
            const updatedIssue = await this.Issuerepository.save(updateEntity);
            return IssueMapper.toResponse(updatedIssue);
        }catch(error){

            throw new CommonException(error.message);
        }
     }

     //get issue by id
     async getIssueById(id:string):Promise<IssueResponse>{

        try{
            const issue = await this.Issuerepository.findOneBy({id});
            if(!issue){
                throw new CommonException('Issue not found',HttpStatus.NOT_FOUND);
            }
            return IssueMapper.toResponse(issue);
        }catch(error){
            throw new CommonException(error.message);
        }
     }

     //mark as resolved or close
     async markAsResolveOrClose(id: string, status: IssueStatus, userId: string): Promise<IssueResponse> {
        try {
            const issue = await this.Issuerepository.findOneBy({id});
            if(!issue) {
                throw new CommonException('Issue not found', HttpStatus.NOT_FOUND);
            }
            
            // Validate that only RESOLVED or CLOSED status is allowed
            if (status !== IssueStatus.RESOLVED && status !== IssueStatus.CLOSED) {
                throw new CommonException('Only RESOLVED or CLOSED status are allowed', HttpStatus.BAD_REQUEST);
            }
            
            // Check if user exists
            const user = await this.userRepository.findOneBy({id: userId});
            if(!user) {
                throw new CommonException('User not found', HttpStatus.NOT_FOUND);
            }
            
            issue.status = status;
            await this.Issuerepository.save(issue);
            return IssueMapper.toResponse(issue);
            
        } catch(error) {
            throw new CommonException(error.message);   
        }
     }
     
   

}
