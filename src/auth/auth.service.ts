import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from '../users/entities/users.entity';
import { Repository } from 'typeorm';


@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UsersEntity)
        private readonly usersRepo: Repository<UsersEntity>,
    ) { }

    async login(identifier: string, password: string) {

        console.log(identifier, password);
        // Cari user berdasarkan email atau username
        const user = await this.usersRepo.findOne({
            where: [
                { email: identifier },
                { username: identifier },
            ],
        });

        if (!user) {
            throw new UnauthorizedException('Email/Username atau password salah');
        }

        // Cek password

        if ((password !== user.password)) {
            throw new UnauthorizedException('Email/Username atau password salah');
        }

        // Kalau valid, return user
        return user;
    }
}
