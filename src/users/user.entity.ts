import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne,  } from "typeorm";
import { KYC } from "src/kyc/kyc.entity";
import { Phone } from "src/phone/phone.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    email: string;

    @Column()
    pin: string;

    @Column()
    otp: string;

    @OneToMany(type => KYC, kyc => kyc.user)
    kycs: KYC[];    

    @OneToMany(type => Phone, phone => phone.user)
    phones: Phone[];
}