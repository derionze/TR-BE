import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from 'src/users/entities/users.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
    imports: [TypeOrmModule.forFeature([UsersEntity])],
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule { }
