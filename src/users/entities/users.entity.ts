import { KeranjangUsersEntity } from "src/keranjang-users/entities/keranjang-users.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity('users')
export class UsersEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    username: string;

    @Column()
    password: string;

    @Column({ unique: true })
    email: string;

    @Column({ nullable: true, name: 'no_telp' })
    noTelp: string;

    @Column({ nullable: true, name: 'tanggal_lahir' })
    tanggalLahir: string;

    @Column({ nullable: true })
    alamat: string;

    @OneToMany(() => KeranjangUsersEntity, keranjang => keranjang.user)
    keranjang: KeranjangUsersEntity[];


    @Column()
    role: 'admin' | 'pelanggan';
}