import { Controller, Get, Post } from '@nestjs/common';
import { BinanceService } from './binance.service';
import { TransactionidService } from 'src/modeles/transactionid/transactionid.service';
import { NotFoundException } from '@nestjs/common';
import { Transactionid } from 'src/modeles/transactionid/transaction.entity';
import { TransactionhistoryService } from 'src/modeles/transactionhistory/transactionhistory.service';
import { TransactionHistory } from 'src/modeles/transactionhistory/transaction.entity';
import { CoursService } from 'src/modeles/cours/cours.service';
import { SoldeuserService } from 'src/modeles/soldeuser/soldeuser.service';
import { SoldeshoyaService } from 'src/modeles/soldeshoya/soldeshoya.service';
import { Body } from '@nestjs/common';

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

  @Post('/faireretrait')
  async transactionDeposit(
    @Body() body: { txid: string, iduser: number }
  ): Promise<any> {
    let montant = 0;
   let validiteapi = false;
   let validitebase = true;
   let montantretrait = 0;
   let actif = '';
   const listeapi = await this.binanceService.depositHistory();
   for(let i=0; i<listeapi.length; i++){
        if(listeapi[i].txId==body.txid){
            validiteapi = true;
            montant = listeapi[i].amount;
            montantretrait = (await this.coursService.findByName(listeapi[i].coin)).retrait;
            actif = (await this.coursService.findByName(listeapi[i].coin)).actif;
        }
   }
   const listebase = await this.transactionIdService.findAll(); 
   for(let i=0; i<listebase.length; i++){
        if(listebase[i].txid==body.txid){
            validitebase = false;
        }
   }
   if(validiteapi && validitebase){
        const newtransactionid = new Transactionid();
        newtransactionid.txid = body.txid;
        newtransactionid.iduser = body.iduser;
        await this.transactionIdService.create(newtransactionid);

        const listetransaction = await this.transactionhistoryService.findAll();

        const newtransachistory = new TransactionHistory();
        newtransachistory.iduser = body.iduser;
        newtransachistory.type = "retrait";
        newtransachistory.montant = montant;
        newtransachistory.cours = montantretrait;
        newtransachistory.actif = 'USDT';
        newtransachistory.numeroordre = (listetransaction.length+1) + "";
        await this.transactionhistoryService.create(newtransachistory);

        const soldeUser = await this.soldeuserService.findByUser(body.iduser);
        soldeUser[0].solde += montant * montantretrait;
        await this.soldeuserService.update(soldeUser[0].id, soldeUser[0]);

        const soldeshoya = await this.soldeshoyaService.findAll();
        soldeshoya[0].usdt += (+montant);
        soldeshoya[0].mga += - (montantretrait * montant);
        await this.soldeshoyaService.update(soldeshoya[0].id, soldeshoya[0]);
        return { message : 'Success de la transaction' }
    }
   else{
      let errormessage = '';
        if(!validiteapi){
          errormessage += ' - Txid invalide - ';
        }
        if(!validitebase){
          errormessage += ' - Txid deja utilisee - ';
        }
        throw new NotFoundException(errormessage);
   }
  }

  //////// DEPOT  

  // AMPY VE NY SOLDE MGA ANLE USER
  // AMPY VE NY SOLDE USDT ANLE SHOYA

  @Post('/fairedepot')
  async transactionDepot(
    @Body() body: { iduser: number, montant: number, adress: string }
  ): Promise<any> {
    let messageresult = '';
    try {
      await this.binanceService.withdraw(body.montant,body.adress);

    const soldeUser = await this.soldeuserService.findByUser(body.iduser);
    const depot = (await this.coursService.findByName('usdt')).depot;
    if (!soldeUser || soldeUser.length === 0) {
      throw new Error('Utilisateur introuvable.');
    }

    soldeUser[0].solde -= (body.montant * depot);
    await this.soldeuserService.update(soldeUser[0].id, soldeUser[0]);
    const soldeshoya = await this.soldeshoyaService.findAll();
    if (!soldeshoya || soldeshoya.length === 0) {
      throw new Error('Solde global introuvable.');
    }

    const listetransaction = await this.transactionhistoryService.findAll();

    soldeshoya[0].usdt -= (body.montant);
    soldeshoya[0].mga += (depot * body.montant);
    await this.soldeshoyaService.update(soldeshoya[0].id, soldeshoya[0]);
    const newtransachistory = new TransactionHistory();
    newtransachistory.iduser = body.iduser;
    newtransachistory.type = 'depot';
    newtransachistory.montant = body.montant;
    newtransachistory.cours = depot;
    newtransachistory.actif = 'USDT';
    newtransachistory.numeroordre = 'depot_binance_'+(listetransaction.length+1) + "";
    await this.transactionhistoryService.create(newtransachistory);
    return { messageresult : 'Transaction effectuee' } 
  } catch (error) {
    return { messageresult : error }
  }
}

  @Post('/network-list')
  async getNetworkList(@Body('coin') coin: string): Promise<any> {
    return await this.binanceService.getNetworkList(coin);
  }

  @Post('/network-adress')
  async getNetworkAdress(@Body() body: { network: string}): Promise<any> {
    return await this.binanceService.getNetworkAdress(body.network);
  }

  @Post('/test')
  async test(@Body('teste') teste: string){
    return { message: teste }
  }

  @Get('/withdraw-history')
  async getWithdrawHistory(): Promise<any> {
    return await this.binanceService.getWithdrawHistory();
  }
}