import { Module } from '@nestjs/common';
import { PromoService } from './promo.service';
import { PromoController } from './promo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PromoEntity } from './entities/promo.entity';
import { PromoSeeder } from './promo.seeder.service';

@Module({
  imports: [TypeOrmModule.forFeature([PromoEntity])],
  providers: [PromoService, PromoSeeder],
  controllers: [PromoController]
})
export class PromoModule { }
