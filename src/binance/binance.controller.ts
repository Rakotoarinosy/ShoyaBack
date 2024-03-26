import { Controller, Get } from '@nestjs/common';
import { BinanceService } from './binance.service';
import { Param } from '@nestjs/common';
import { TransactionidService } from 'src/transactionid/transactionid.service';
import { NotFoundException } from '@nestjs/common';
import { Transactionid } from 'src/transactionid/transaction.entity';
import { TransactionhistoryService } from 'src/transactionhistory/transactionhistory.service';
import { TransactionHistory } from 'src/transactionhistory/transaction.entity';
import { CoursService } from 'src/cours/cours.service';
import { SoldeuserService } from 'src/soldeuser/soldeuser.service';
import { SoldeshoyaService } from 'src/soldeshoya/soldeshoya.service';

@Controller('binance')
export class BinanceController {
  constructor(private readonly binanceService: BinanceService,
    private readonly transactionIdService: TransactionidService,
    private readonly transactionhistoryService: TransactionhistoryService,
    private readonly coursService: CoursService,
    private readonly soldeuserService: SoldeuserService,
    private readonly soldeshoyaService: SoldeshoyaService
    ) {}

  @Get('/deposit-history')
  async getDepositHistory(): Promise<any> {
    return await this.binanceService.depositHistory();
  }

  // RETRAIT

  @Get('/fairedeposit/:txid/:iduser')
  async transactionDeposit(
   @Param('txid') txid : string, 
   @Param('iduser') iduser : number
  ): Promise<any>{
    let montant = 0;
   let validiteapi = false;
   let validitebase = true;
   let montantretrait = 0;
   let actif = '';
   const listeapi = await this.binanceService.depositHistory();
   for(let i=0; i<listeapi.length; i++){
        if(listeapi[i].txId==txid){
            validiteapi = true;
            montant = listeapi[i].amount;
            montantretrait = (await this.coursService.findByName(listeapi[i].coin)).retrait;
            actif = (await this.coursService.findByName(listeapi[i].coin)).actif;
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

        const newtransachistory = new TransactionHistory();
        newtransachistory.iduser = iduser;
        newtransachistory.type = "retrait";
        newtransachistory.montant = montant;
        newtransachistory.cours = montantretrait;
        newtransachistory.actif = actif;
        newtransachistory.numeroordre = "numero ordre";
        await this.transactionhistoryService.create(newtransachistory);

        const soldeUser = await this.soldeuserService.findByUser(iduser);
        soldeUser[0].solde += montant * montantretrait;
        await this.soldeuserService.update(soldeUser[0].id, soldeUser[0]);

        const soldeshoya = await this.soldeshoyaService.findAll();
        soldeshoya[0].usdt += montant;
        soldeshoya[0].mga += - (montantretrait * montant);
        await this.soldeshoyaService.update(soldeshoya[0].id, soldeshoya[0]);
    }
   else{
        throw new NotFoundException('Txid invalide ou deja utilisee');
   }
  }
  

  // DEPOT

  

  @Get('/network-list')
  async getNetworkList(): Promise<any> {
    return await this.binanceService.getNetworkList();
  }

  @Get('/withdraw-history')
  async getWithdrawHistory(): Promise<any> {
    return await this.binanceService.getWithdrawHistory();
  }
}