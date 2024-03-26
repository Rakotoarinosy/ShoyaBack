import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { ManyToOne, JoinColumn } from "typeorm";
import { User } from "src/modeles/users/user.entity";

@Entity()
export class SoldeUser {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    iduser: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'iduser' })
    user: User;

    @Column()
    solde: number;
}