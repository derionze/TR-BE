// src/keranjang-users/keranjang-users.controller.ts
import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Patch,
    Delete,
} from '@nestjs/common';
import { KeranjangUsersService } from './keranjang-users.service';

@Controller('keranjang-users')
export class KeranjangUsersController {
    constructor(private readonly keranjangUsersService: KeranjangUsersService) { }


    @Get('user/:userId')
    getByUser(@Param('userId') userId: string) {
        return this.keranjangUsersService.findAllByUser(userId);
    }


    @Post()
    create(@Body() body: any) {
        return this.keranjangUsersService.create(body);
    }

    @Get()
    findAll() {
        return this.keranjangUsersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.keranjangUsersService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: number, @Body() body: any) {
        return this.keranjangUsersService.update(id, body);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.keranjangUsersService.remove(id);
    }

    @Delete()
    clear(): Promise<void> {
        return this.keranjangUsersService.clearData();
    }
}
