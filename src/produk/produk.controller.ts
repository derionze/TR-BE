import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe, Query } from '@nestjs/common';
import { ProdukService } from './produk.service';
import { ProdukEntity } from './entities/produk.entity';

@Controller('produk')
export class ProdukController {
    constructor(private readonly produkService: ProdukService) { }

    @Post()
    create(@Body() data: Partial<ProdukEntity>): Promise<ProdukEntity> {
        return this.produkService.create(data);
    }

    @Get()
    findByQuery(
        @Query('search-item') searchItem?: string,
        @Query('category') category?: string,
    ) {
        return this.produkService.findByQuery(searchItem, category);
    }

    // @Get()
    // findAll(): Promise<ProdukEntity[]> {
    //     return this.produkService.findAll();
    // }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: string): Promise<ProdukEntity> {
        return this.produkService.findOne(id);
    }

    @Put(':id')
    update(
        @Param('id', ParseIntPipe) id: string,
        @Body() data: Partial<ProdukEntity>,
    ): Promise<ProdukEntity> {
        return this.produkService.update(id, data);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: string): Promise<void> {
        return this.produkService.remove(id);
    }


}
