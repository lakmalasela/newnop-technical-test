import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/users/user.service';
import * as bcrypt from 'bcrypt';
import { use } from 'passport';
import { AuthUserDto } from './dto/auth-user-dto';

@Injectable()
export class AuthService {
constructor(private userService: UserService,private jwtService:JwtService){}

async validaUser(email: string,pass:string):Promise<AuthUserDto>{

    try{
        const user = await this.userService.findEmail(email);
        const isPasswordMatching = await bcrypt.compare(pass,user.password);
        if(!user || !isPasswordMatching) throw new UnauthorizedException("Invalid Credentials");
         return {
            id: user.id,
            email: user.email,
            role: user.role,
        };

    }catch(error){

        if(error instanceof UnauthorizedException) throw error;
        throw new InternalServerErrorException("Validation Failed");
    }
}
   
async login(user:{id:string,email:string,role:string}){

    try{
        const payload = {
            sub:user.id,
            email:user.email,
            role:user.role
        };

        return {access_token: this.jwtService.sign(payload),userEmail:payload.email,userId:payload.sub};


    }catch(error){
        throw new InternalServerErrorException("Logined Failed");
    }
}
}

