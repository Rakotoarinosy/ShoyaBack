import { Entity, PrimaryGeneratedColumn, Column,  } from "typeorm";

@Entity()
export class SoldeShoya {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    mvola: number;

    @Column()
    orangemoney: number;

    @Column()
    usdt: number;

    @Column()
    pm: number;

    @Column()
    payeer: number;

    @Column()
    skrill: number;

    @Column()
    airtm: number;
}
