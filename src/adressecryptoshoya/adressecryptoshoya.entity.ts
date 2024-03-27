import { Entity, PrimaryGeneratedColumn, Column,  } from "typeorm";

@Entity()
export class AdresseCryptoShoya {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    adresse: string;
}
