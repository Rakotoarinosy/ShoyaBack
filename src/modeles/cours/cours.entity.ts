import { Entity, PrimaryGeneratedColumn, Column,  } from "typeorm";

@Entity()
export class Cours {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    actif: string;

    @Column()
    depot: number;

    @Column()
    retrait: number;
}
