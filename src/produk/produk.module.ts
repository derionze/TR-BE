import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdukEntity } from './entities/produk.entity';
import { ProdukService } from './produk.service';
import { ProdukController } from './produk.controller';
import { ProdukSeederService } from './produk.seeder.service';

@Module({
    imports: [TypeOrmModule.forFeature([ProdukEntity])],
    providers: [ProdukService, ProdukSeederService],
    controllers: [ProdukController]
})
export class ProdukModule { }
