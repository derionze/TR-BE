import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './users/entities/users.entity';
import { ProdukEntity } from './produk/entities/produk.entity';
import { KeranjangUsersEntity } from './keranjang-users/entities/keranjang-users.entity';
import { PromoEntity } from './promo/entities/promo.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [UsersEntity, ProdukEntity, KeranjangUsersEntity, PromoEntity],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
