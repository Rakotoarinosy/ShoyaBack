import { Controller, Get, Post  } from '@nestjs/common';
import { BinanceService } from './binance.service';
import { log } from 'console';
import { Param } from '@nestjs/common';
import { TransactionidService } from 'src/transactionid/transactionid.service';
import { NotFoundException } from '@nestjs/common';
import { Transactionid } from 'src/transactionid/transaction.entity';
import { TransactionhistoryService } from 'src/transactionhistory/transactionhistory.service';
import { TransactionHistory } from 'src/transactionhistory/transaction.entity';
import { CoursService } from 'src/cours/cours.service';
import { Cours } from 'src/cours/cours.entity';
import { SoldeuserService } from 'src/soldeuser/soldeuser.service';

@Controller('binance')
export class BinanceController {
  constructor(private readonly binanceService: BinanceService,
    private readonly transactionIdService: TransactionidService,
    private readonly transactionhistoryService: TransactionhistoryService,
    private readonly coursService: CoursService,
    private readonly soldeuserService: SoldeuserService
    ) {}

  @Get('/deposit-history')
  async getDepositHistory(): Promise<any> {
    return await this.binanceService.depositHistory();
  }


  //OVAINA TSY MAMPIDITRA MONTANT
  @Get('/fairedeposit/:txid/:iduser/:idactif/:montant')
  async transactionDeposit(
   @Param('txid') txid : string, 
   @Param('iduser') iduser : number,
   @Param('idactif') idactif : number,
   @Param('montant') montant : number
  ): Promise<any>{
   let validiteapi = false;
   let validitebase = true;
   const listeapi = await this.binanceService.depositHistory();
   for(let i=0; i<listeapi.length; i++){
        if(listeapi[i].txId==txid){
            validiteapi = true;
        }
   }
   const listebase = await this.transactionIdService.findAll(); 
   for(let i=0; i<listebase.length; i++){
        if(listebase[i].txid==txid){
            validitebase = false;
        }
   }
   if(validiteapi && validitebase){
        const newtransactionid = new Transactionid();
        newtransactionid.txid = txid;
        newtransactionid.iduser = iduser;
        await this.transactionIdService.create(newtransactionid);

        const montantretrait = (await this.coursService.findOne(idactif)).retrait;

        const newtransachistory = new TransactionHistory();
        newtransachistory.iduser = iduser;
        newtransachistory.type = "retrait";
        newtransachistory.montant = montant;
        newtransachistory.cours = montantretrait;
        newtransachistory.actif = (await this.coursService.findOne(idactif)).actif;
        newtransachistory.numeroordre = "numero ordre";
        await this.transactionhistoryService.create(newtransachistory);

        const soldeUser = await this.soldeuserService.findByUser(iduser);
        console.log(soldeUser[0].solde);
        soldeUser[0].solde += montant * montantretrait;
        await this.soldeuserService.update(soldeUser[0].id, soldeUser[0]);
   }
   else{
        throw new NotFoundException('Txid invalide ou deja utilisee');
   }
  }
  

  @Get('/network-list')
  async getNetworkList(): Promise<any> {
    return await this.binanceService.getNetworkList();
  }
}