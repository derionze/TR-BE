import { KeranjangUsersEntity } from "src/keranjang-users/entities/keranjang-users.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity('produk')
export class ProdukEntity {
    @PrimaryGeneratedColumn('increment')
    id: string;

    @Column({ name: 'nama_produk' })
    namaProduk: string;

    @Column()
    harga: number;

    @Column()
    stok: number;

    @Column()
    kategori: string;

    @Column()
    deskripsi: string;

    @Column()
    rating: number;

    @OneToMany(() => KeranjangUsersEntity, keranjang => keranjang.produk)
    keranjang: KeranjangUsersEntity[];


}