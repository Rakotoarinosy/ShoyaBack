import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne,  } from "typeorm";
import { KYC } from "src/modeles/kyc/kyc.entity";
import { Phone } from "src/modeles/phone/phone.entity";
import { AdresseUSDT } from "src/modeles/adresseusdt/adresseusdt.entity";
import { Transactionid } from "src/modeles/transactionid/transaction.entity";
import { TransactionHistory } from "src/modeles/transactionhistory/transaction.entity";
import { SoldeUser } from "src/modeles/soldeuser/soldeuser.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    email: string;

    @Column()
    pin: string;

    @Column({ type: 'boolean', default: false })
    validation: boolean;

    @OneToMany(type => KYC, kyc => kyc.user)
    kycs: KYC[];    

    @OneToMany(type => Phone, phone => phone.user)
    phones: Phone[];

    @OneToMany(type => AdresseUSDT, adresse => adresse.user)
    adresses: AdresseUSDT[];

    @OneToMany(type => Transactionid, transac => transac.user)
    transactions: Transactionid[];

    @OneToMany(type => TransactionHistory, transach => transach.user)
    transactionsh: TransactionHistory[];

    @OneToMany(type => SoldeUser, solde => solde.user)
    soldeuser: SoldeUser[];
}