/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
    imports: [UsersModule, JwtModule.registerAsync({
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
            secret: configService.get<string>('JWT_SECRET') || 'your-secret-key-here',
            signOptions: { expiresIn: '1h' }
        }),
        inject: [ConfigService],
    })],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    exports:[AuthService]
})
export class AuthModule { }
