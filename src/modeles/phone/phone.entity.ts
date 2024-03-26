import { Entity, PrimaryGeneratedColumn, Column,  } from "typeorm";
import { User } from "src/modeles/users/user.entity";
import { ManyToOne, JoinColumn } from "typeorm";

@Entity()
export class Phone {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    iduser: number;

    @ManyToOne(() => User, user => user.phones)
    @JoinColumn({ name: 'iduser' })
    user: User;

    @Column()
    numero: string;
}
