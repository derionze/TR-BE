import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { UsersEntity } from 'src/users/entities/users.entity';
import { ProdukEntity } from 'src/produk/entities/produk.entity';

@Entity('keranjang_users')
export class KeranjangUsersEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => UsersEntity, user => user.keranjang, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: UsersEntity;

    @ManyToOne(() => ProdukEntity, produk => produk.keranjang, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'produk_id' })
    produk: ProdukEntity;

    @Column()
    jumlah: number;

    @Column({ nullable: true })
    catatan: string;
}
