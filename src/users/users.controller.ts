import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe, ParseUUIDPipe, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersEntity } from './entities/users.entity';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    create(@Body() data: Partial<UsersEntity>): Promise<UsersEntity> {
        return this.usersService.create(data);
    }

    @Get()
    findAll(): Promise<UsersEntity[]> {
        return this.usersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseUUIDPipe) id: string): Promise<UsersEntity> {
        return this.usersService.findOne(id);
    }

    @Patch(':id')
    update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() data: Partial<UsersEntity>,
    ): Promise<UsersEntity> {
        return this.usersService.update(id, data);
    }

    @Delete(':id')
    remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
        return this.usersService.remove(id);
    }
}
