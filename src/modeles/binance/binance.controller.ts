import { Controller, Get, Post } from '@nestjs/common';
import { BinanceService } from './binance.service';
import { Param } from '@nestjs/common';
import { TransactionidService } from 'src/modeles/transactionid/transactionid.service';
import { NotFoundException } from '@nestjs/common';
import { Transactionid } from 'src/modeles/transactionid/transaction.entity';
import { TransactionhistoryService } from 'src/modeles/transactionhistory/transactionhistory.service';
import { TransactionHistory } from 'src/modeles/transactionhistory/transaction.entity';
import { CoursService } from 'src/modeles/cours/cours.service';
import { SoldeuserService } from 'src/modeles/soldeuser/soldeuser.service';
import { SoldeshoyaService } from 'src/modeles/soldeshoya/soldeshoya.service';

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

  @Get('/faireretrait/:txid/:iduser')
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
        soldeshoya[0].usdt += (+montant);
        soldeshoya[0].mga += - (montantretrait * montant);
        await this.soldeshoyaService.update(soldeshoya[0].id, soldeshoya[0]);
    }
   else{
      let errormessage = '';
        if(!validiteapi){
          errormessage += 'Txid invalide';
        }
        if(!validitebase){
          errormessage += 'Txid deja utilisee';
        }
        throw new NotFoundException(errormessage);
   }
  }

  //////// DEPOT  

  @Get('/fairedepot/:iduser/:montant/:adress')
async transactionDepot(
  @Param('iduser') iduser: number,
  @Param('montant') montant: number,
  @Param('adress') adress: string
): Promise<void> {
  try {

    // await this.binanceService.withdraw(montant,adress);

    const soldeUser = await this.soldeuserService.findByUser(iduser);
    const depot = (await this.coursService.findByName('usdt')).depot;
    if (!soldeUser || soldeUser.length === 0) {
      throw new Error('Utilisateur introuvable.');
    }

    soldeUser[0].solde -= (montant * depot);
    await this.soldeuserService.update(soldeUser[0].id, soldeUser[0]);
    const soldeshoya = await this.soldeshoyaService.findAll();
    if (!soldeshoya || soldeshoya.length === 0) {
      throw new Error('Solde global introuvable.');
    }

    soldeshoya[0].usdt -= (montant);
    soldeshoya[0].mga += (depot * montant);
    await this.soldeshoyaService.update(soldeshoya[0].id, soldeshoya[0]);
    const newtransachistory = new TransactionHistory();
    newtransachistory.iduser = iduser;
    newtransachistory.type = 'depot';
    newtransachistory.montant = montant;
    newtransachistory.cours = depot;
    newtransachistory.actif = 'USDT';
    newtransachistory.numeroordre = 'numero ordre';
    await this.transactionhistoryService.create(newtransachistory);
  } catch (error) {
    console.error('Erreur lors du traitement de la transaction de dépôt :', error.message);
  }
}

  @Get('/network-list')
  async getNetworkList(): Promise<any> {
    return await this.binanceService.getNetworkList();
  }

  // @Post('/withdraw/:amount/:adress')
  // async WithDraw(@Param('amount') amount : number, 
  // @Param('adress') adress : string): Promise<any> {
  //   return await this.binanceService.withdraw(amount,adress);
  // }

  @Get('/withdraw-history')
  async getWithdrawHistory(): Promise<any> {
    return await this.binanceService.getWithdrawHistory();
  }
}