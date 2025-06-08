import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './users/entities/users.entity';
import { ProdukEntity } from './produk/entities/produk.entity';
import { KeranjangUsersEntity } from './keranjang-users/entities/keranjang-users.entity';
import { PromoEntity } from './promo/entities/promo.entity';
import { UsersModule } from './users/users.module';
import { KeranjangUsersModule } from './keranjang-users/keranjang-users.module';
import { ProdukModule } from './produk/produk.module';
import { PromoModule } from './promo/promo.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [UsersEntity, ProdukEntity, KeranjangUsersEntity, PromoEntity],
      synchronize: true,
    }),
    UsersModule,
    KeranjangUsersModule,
    ProdukModule,
    PromoModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
