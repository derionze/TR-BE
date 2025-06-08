import { PrimaryGeneratedColumn } from "typeorm";
import { Column, Entity } from "typeorm";

@Entity('promo')
export class PromoEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ name: 'nama_promo' })
    namaPromo: string;

    @Column({ name: 'deskripsi_promo' })
    deskripsiPromo: string;

    @Column({ name: 'tanggal_dimulai' })
    tanggalDimulai: string;

    @Column({ name: 'tanggal_expired' })
    tanggalExpired: string;

}