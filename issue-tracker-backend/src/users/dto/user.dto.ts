import { IsEmail, IsEnum, IsNotEmpty, MinLength } from "class-validator";
import { ROLE } from "../enum/role.enum";

export class CreateUserDto{

    @IsEmail()
    email:string;

    @IsNotEmpty()
    @MinLength(6)
    password:string;

    @IsEnum(ROLE)
    role:ROLE

}