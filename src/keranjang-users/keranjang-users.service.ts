// keranjang-users.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { KeranjangUsersEntity } from './entities/keranjang-users.entity';
import { UsersEntity } from 'src/users/entities/users.entity';
import { ProdukEntity } from 'src/produk/entities/produk.entity';

@Injectable()
export class KeranjangUsersService {
    constructor(
        @InjectRepository(KeranjangUsersEntity)
        private readonly keranjangRepo: Repository<KeranjangUsersEntity>,

        @InjectRepository(UsersEntity)
        private readonly usersRepo: Repository<UsersEntity>,

        @InjectRepository(ProdukEntity)
        private readonly produkRepo: Repository<ProdukEntity>
    ) { }

    async create(data: {
        userId: string;
        produkId: string;
        jumlah: number;
        catatan?: string;
    }) {
        const user = await this.usersRepo.findOne({ where: { id: data.userId } });
        if (!user) {
            throw new Error('User tidak ditemukan');
        }

        const produk = await this.produkRepo.findOne({ where: { id: data.produkId } });
        if (!produk) {
            throw new Error('Produk tidak ditemukan');
        }

        // Cek apakah produk sudah ada di keranjang user
        const existingKeranjang = await this.keranjangRepo.findOne({
            where: {
                user: { id: data.userId },
                produk: { id: data.produkId },
            },
            relations: ['user', 'produk'],
        });

        if (existingKeranjang) {
            // Jika sudah ada, tambahkan jumlahnya
            existingKeranjang.jumlah += data.jumlah;
            if (data.catatan) {
                existingKeranjang.catatan = data.catatan;
            }
            return this.keranjangRepo.save(existingKeranjang);
        }

        // Jika belum ada, buat baru
        const { userId, ...payload } = data;
        const keranjang = this.keranjangRepo.create({ ...payload, user, produk });
        return this.keranjangRepo.save(keranjang);
    }



    async findAll() {
        return this.keranjangRepo.find({ relations: ['user', 'produk'] });
    }

    async findOne(id: number) {
        const keranjang = await this.keranjangRepo.findOne({
            where: { id },
            relations: ['user', 'produk'],
        });
        if (!keranjang) throw new NotFoundException('Data tidak ditemukan');
        return keranjang;
    }

    async update(id: number, data: Partial<KeranjangUsersEntity>) {
        console.log(data);
        const keranjang = await this.findOne(id);
        Object.assign(keranjang, data);
        return this.keranjangRepo.save(keranjang);
    }

    async remove(id: number) {
        // console.log(id);
        const keranjang = await this.findOne(id);
        if (!keranjang) {
            throw new Error('Keranjang tidak ditemukan');
        }

        if (keranjang.jumlah > 1) {
            keranjang.jumlah -= 1;
            return this.keranjangRepo.save(keranjang);
        } else {
            return this.keranjangRepo.remove(keranjang);
        }
    }


    async findAllByUser(userId: string) {
        try {
            // console.log(userId);
            const user = await this.usersRepo.findOne({ where: { id: userId } });
            if (!user) {
                throw new Error('User tidak ditemukan');
            }
            const keranjang = await this.keranjangRepo.find({ where: { user }, relations: ['user', 'produk'] });

            return keranjang;

        } catch (e) {
            throw e;
        }
    }

    async clearData() {
        try {
            await this.keranjangRepo.clear();

        } catch (e) {
            throw e;
        }
    }
}