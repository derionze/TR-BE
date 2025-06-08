import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { PromoService } from './promo.service';
import { PromoEntity } from './entities/promo.entity';

@Controller('promo')
export class PromoController {
    constructor(private readonly promoService: PromoService) { }

    @Get()
    findAll(): Promise<PromoEntity[]> {
        return this.promoService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number): Promise<PromoEntity> {
        return this.promoService.findOne(id);
    }

    @Post()
    create(@Body() data: Partial<PromoEntity>): Promise<PromoEntity> {
        return this.promoService.create(data);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() data: Partial<PromoEntity>): Promise<PromoEntity> {
        return this.promoService.update(id, data);
    }

    @Delete(':id')
    remove(@Param('id') id: number): Promise<void> {
        return this.promoService.remove(id);
    }
}
