import { Entity, PrimaryGeneratedColumn, Column, Timestamp,  } from "typeorm";
import { ManyToOne, JoinColumn } from "typeorm";
import { User } from "src/users/user.entity";

@Entity()
export class Transactionid {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    iduser: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'iduser' })
    user: User;

    @Column()
    txid: string;

    @Column({ type: 'timestamp' })
    date: Date;
}