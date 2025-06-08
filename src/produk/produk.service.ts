import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProdukEntity } from './entities/produk.entity';
import { ILike } from 'typeorm';

@Injectable()
export class ProdukService {
    constructor(
        @InjectRepository(ProdukEntity)
        private readonly produkRepo: Repository<ProdukEntity>,
    ) { }


    async findByQuery(searchItem?: string, category?: string) {
        const where: any = {};

        if (searchItem) {
            where.namaProduk = ILike(`%${searchItem}%`);
        }

        if (category) {
            where.kategori = ILike(`%${category}%`);
        }

        return this.produkRepo.find({ where });
    }

    // Create produk
    async create(data: Partial<ProdukEntity>): Promise<ProdukEntity> {
        const produk = this.produkRepo.create(data);
        return this.produkRepo.save(produk);
    }

    // Read all produk
    async findAll(): Promise<ProdukEntity[]> {
        return this.produkRepo.find();
    }

    // Read produk by id
    async findOne(id: string): Promise<ProdukEntity> {
        const produk = await this.produkRepo.findOneBy({ id });
        if (!produk) {
            throw new NotFoundException(`Produk dengan id ${id} tidak ditemukan`);
        }
        return produk;
    }

    // Update produk by id
    async update(id: string, data: Partial<ProdukEntity>): Promise<ProdukEntity> {
        const produk = await this.findOne(id);
        Object.assign(produk, data);
        return this.produkRepo.save(produk);
    }

    // Delete produk by id
    async remove(id: string): Promise<void> {
        const result = await this.produkRepo.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Produk dengan id ${id} tidak ditemukan`);
        }
    }
}
