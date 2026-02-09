/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller,Post,Body, HttpException, HttpStatus, Get } from '@nestjs/common';
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
        async getAllUsers():Promise<UserEntity[]>{

            try{
                return await this.userService.GetAll();
            }catch(error){
                throw new HttpException(
                    error.message,
                    error.status || HttpStatus.UNAUTHORIZED
                )
            }
            
        }
    
 }
