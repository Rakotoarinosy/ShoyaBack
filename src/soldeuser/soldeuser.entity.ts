import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { ManyToOne, JoinColumn } from "typeorm";
import { User } from "src/users/user.entity";

@Entity()
export class SoldeUser {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'iduser' })
    user: User;

    @Column()
    solde: number;
}