import { Entity, PrimaryGeneratedColumn, Column,  } from "typeorm";

@Entity()
export class AdresseNetwork {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    network: string;

    @Column()
    diminutif: string;
}