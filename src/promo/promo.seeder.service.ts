// src/database/seeders/promo.seeder.ts
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PromoEntity } from './entities/promo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PromoSeeder implements OnApplicationBootstrap {
    constructor(
        @InjectRepository(PromoEntity)
        private readonly promoRepository: Repository<PromoEntity>,
    ) { }

    async onApplicationBootstrap() {
        const data: PromoEntity[] = [
            {
                id: 1234,
                namaPromo: 'Sarapan Sehat',
                deskripsiPromo: 'Sarapan Sehat dan Bergiji',
                tanggalDimulai: '2023-05-29',
                tanggalExpired: '2023-05-31',
            },
            {
                id: 1323,
                namaPromo: 'Roti Keong',
                deskripsiPromo: 'Roti Keong Nikmat',
                tanggalDimulai: '2023-05-29',
                tanggalExpired: '2023-05-30',
            },
            {
                id: 4136,
                namaPromo: 'Tasty Bread',
                deskripsiPromo: 'Roti Enak dan Bergiji',
                tanggalDimulai: '2023-06-03',
                tanggalExpired: '2023-06-09',
            },
            {
                id: 5743,
                namaPromo: 'Roti Tawar Yummy',
                deskripsiPromo: 'Roti Tawar Yummy',
                tanggalDimulai: '2023-05-29',
                tanggalExpired: '2023-05-31',
            },
            {
                id: 5829,
                namaPromo: 'Croissant Yummy',
                deskripsiPromo: 'Croissant enak dan wangi',
                tanggalDimulai: '2023-06-03',
                tanggalExpired: '2023-06-16',
            },
            {
                id: 5839,
                namaPromo: 'Chocolatte Cookies',
                deskripsiPromo: 'Kue Kukis dengan taburan chococips',
                tanggalDimulai: '2023-06-03',
                tanggalExpired: '2023-06-22',
            },
        ];

        for (const promo of data) {
            const exists = await this.promoRepository.findOneBy({ id: promo.id });
            if (!exists) {
                await this.promoRepository.insert(promo);
            }
        }
    }
}
