import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { ManyToOne, JoinColumn } from "typeorm";
import { User } from "src/users/user.entity";

@Entity()
export class TransactionHistory {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    iduser: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'iduser' })
    user: User;

    @Column()
    type: string;

    @Column()
    actif: string;

    @Column()
    montant: number;

    @Column()
    cours: number;

    @Column({ type: 'timestamp' })
    date: Date;

    @Column()
    numeroordre: string;
}