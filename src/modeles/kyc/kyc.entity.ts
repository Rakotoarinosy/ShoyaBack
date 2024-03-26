import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { ManyToOne, JoinColumn } from "typeorm";
import { User } from "src/modeles/users/user.entity";

@Entity()
export class KYC {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    iduser: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'iduser' })
    user: User;

    @Column()
    nom: string;

    @Column()
    prenom: string;

    @Column()
    cin_passeport: string;

    @Column()
    adresse: string;

    @Column({ type: 'boolean', default: false })
    validation: boolean;
}