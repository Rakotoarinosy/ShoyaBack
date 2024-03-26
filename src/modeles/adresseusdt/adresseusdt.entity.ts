import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { ManyToOne, JoinColumn } from "typeorm";
import { User } from "src/modeles/users/user.entity";

@Entity()
export class AdresseUSDT {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    iduser: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'iduser' })
    user: User;

    @Column()
    adresse: string;

    @Column()
    reseau: string;

    @Column()
    libelle: string;
}