/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller,Post,Body, HttpException, HttpStatus, Get, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './entity/user.entity';
import { CreateUserDto } from './dto/user.dto';
import { use } from 'passport';
import { ROLE } from './enum/role.enum';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/decorator/roles.decorator';
import { RoleGuard } from 'src/auth/guard/role.guard';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { BaseResponse } from 'src/common/response/base.response';


@Controller('user')
export class UserController {

    constructor(private userService:UserService){}


    
        @Post()
        async CreateUserDto(@Body() createUserDto:CreateUserDto){

            try{

                const user = await this.userService.createUser(createUserDto);
                const {password,...results} = user;
                
                return{
                    message: "User Create Successfully",
                    data: results
                }
            }catch(error){
                throw new HttpException(
                    error.message,
                    error.status || HttpStatus.UNAUTHORIZED
                )

            }
        }

        @Get('/list')
        @UseGuards(JwtAuthGuard,RoleGuard)
        @Roles(ROLE.ADMIN)
        async getAllUsers(
            @Query('page') page?: number,
            @Query('limit') limit?: number
        ):Promise<BaseResponse<{ data: UserEntity[]; total: number; page: number; limit: number; }>>{

            try{
                const result = await this.userService.GetAll(Number(page) || 1, Number(limit) || 10);
                return new BaseResponse(true, 'User List', result);
            }catch(error){
                return new BaseResponse(false, error.message);
            }
            
        }
    
 }
