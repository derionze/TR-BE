import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PromoEntity } from './entities/promo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PromoService {
    constructor(
        @InjectRepository(PromoEntity)
        private readonly promoRepo: Repository<PromoEntity>,
    ) { }

    async findAll(): Promise<PromoEntity[]> {
        return this.promoRepo.find();
    }

    async findOne(id: number): Promise<PromoEntity> {
        const promo = await this.promoRepo.findOne({ where: { id } });
        if (!promo) {
            throw new NotFoundException('Promo tidak ditemukan');
        }
        return promo;
    }

    async create(data: Partial<PromoEntity>): Promise<PromoEntity> {
        const promo = this.promoRepo.create(data);
        return this.promoRepo.save(promo);
    }

    async update(id: number, data: Partial<PromoEntity>): Promise<PromoEntity> {
        const promo = await this.findOne(id);
        Object.assign(promo, data);
        return this.promoRepo.save(promo);
    }

    async remove(id: number): Promise<void> {
        const promo = await this.findOne(id);
        await this.promoRepo.remove(promo);
    }
}
