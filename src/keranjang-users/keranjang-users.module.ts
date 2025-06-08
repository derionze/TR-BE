import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KeranjangUsersEntity } from './entities/keranjang-users.entity';
import { KeranjangUsersService } from './keranjang-users.service';
import { KeranjangUsersController } from './keranjang-users.controller';
import { UsersEntity } from 'src/users/entities/users.entity';
import { ProdukEntity } from 'src/produk/entities/produk.entity';

@Module({
    imports: [TypeOrmModule.forFeature([KeranjangUsersEntity, UsersEntity, ProdukEntity])],
    providers: [KeranjangUsersService],
    controllers: [KeranjangUsersController]
})
export class KeranjangUsersModule { }
