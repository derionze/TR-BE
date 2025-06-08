import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UsersEntity)
        private readonly usersRepo: Repository<UsersEntity>,
    ) { }

    // Create user
    async create(data: Partial<UsersEntity>): Promise<UsersEntity> {
        const user = this.usersRepo.create(data);
        return this.usersRepo.save(user);
    }

    // Read all users
    async findAll(): Promise<UsersEntity[]> {
        return this.usersRepo.find();
    }

    // Read user by id
    async findOne(id: string): Promise<UsersEntity> {
        const user = await this.usersRepo.findOneBy({ id });
        if (!user) {
            throw new NotFoundException(`User with id ${id} not found`);
        }
        return user;
    }

    // Update user by id
    async update(id: string, data: Partial<UsersEntity>): Promise<UsersEntity> {
        console.log(data);
        const user = await this.findOne(id);
        Object.assign(user, data);
        return this.usersRepo.save(user);
    }

    // Delete user by id
    async remove(id: string): Promise<void> {
        const result = await this.usersRepo.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`User with id ${id} not found`);
        }
    }
}
