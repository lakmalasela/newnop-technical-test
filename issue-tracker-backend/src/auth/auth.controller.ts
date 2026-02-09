/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller,Body,Post, HttpException, HttpStatus,Get,UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { RoleGuard } from './guard/role.guard';
import { Roles } from 'src/decorator/roles.decorator';
import { ROLE } from 'src/users/enum/role.enum';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService:AuthService){}

    @Post('login')
      async login(@Body() loginDto:LoginDto):Promise<LoginResponseDto>{
    
        try{
            const user = await this.authService.validaUser(
                loginDto.email,
                loginDto.password
            );

          return await this.authService.login(user);
        }catch(error){
            throw new HttpException(
                error.message,
                error.status || HttpStatus.UNAUTHORIZED,
            );
        }
    }

    
    @Get('admin-access')
    @UseGuards(JwtAuthGuard,RoleGuard)
    @Roles(ROLE.ADMIN)
    async getAdminAccess (){
        return "Access the Admin";
    }
}
