import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>
    ){}

    async createUser(createuserDto:CreateUserDto):Promise<UserEntity>{
        try{

            const {password,...rest} = createuserDto;

            const exisitUser = await this.userRepository.findOne({where:{email:rest.email}});
            if(exisitUser){
                throw new ConflictException("User Already Exist");
            }


            const salt = await bcrypt.genSalt();
            const hashPassword = await bcrypt.hash(password,salt);
            const user = this.userRepository.create({
                ...rest,
                password:hashPassword
            });

            return await this.userRepository.save(user);
            // const user = this.userRepository.create()
        }catch(error){
            if(error instanceof ConflictException) throw error;
                throw new InternalServerErrorException;

        }
    }


    async findEmail(email:string):Promise<UserEntity>{
        try{

            const user  = await this.userRepository.findOne({where:{email}})
            if(!user) throw new NotFoundException("User Not Found");
            return user;
        }catch(error){
            if(error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException;
        }
    }


    async GetAll():Promise<UserEntity[]>{
        try{
            return await this.userRepository.find();
        }catch(error){
            throw new InternalServerErrorException;
        }
    }
}
