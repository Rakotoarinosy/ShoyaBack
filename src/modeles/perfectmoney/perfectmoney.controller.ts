import { Controller } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { Perfectmoneyservice } from './perfectmoney.service';
import { Body } from '@nestjs/common';
import { TransactionhistoryService } from '../transactionhistory/transactionhistory.service';
import { SoldeuserService } from '../soldeuser/soldeuser.service';
import { CoursService } from '../cours/cours.service';
import { SoldeshoyaService } from '../soldeshoya/soldeshoya.service';
import { TransactionHistory } from '../transactionhistory/transaction.entity';
import { Redirect } from '@nestjs/common';
import { Post } from '@nestjs/common';

@Controller('perfectmoney')
export class PerfectmoneyController {
    constructor(private readonly perfectMoneyService: Perfectmoneyservice,    
      private readonly transactionhistoryService: TransactionhistoryService,
      private readonly soldeuserService : SoldeuserService,
      private readonly coursService : CoursService,
      private readonly soldeshoyaService : SoldeshoyaService
  ){}
    
  @Get('get-balance')
  async fetchData() {
    try {
      const result = await this.perfectMoneyService.fetchAPI();
      return result;
    } catch (error) {
      return { error: error.message };
    }
  }

  // DEPOT

  // AMPY VE NY SOLDE MGA ANLE USER
  // AMPY VE NY SOLDE USDT ANLE SHOYA

  @Get('depot')
  async transferFunds(@Body() body: { iduser: number, receveur: string, montant: number, paymentid: string}): Promise<any> {
    let messageresult = '';
    try {
      const result = await this.perfectMoneyService.transferFunds(body.receveur, body.montant, body.paymentid);

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
    newtransachistory.numeroordre = 'depot_pm_'+(listetransaction.length+1) + "";
    await this.transactionhistoryService.create(newtransachistory);
    return { messageresult : 'Transaction effectuee' } 
  } catch (error) {
    return { messageresult : error }
  }
  }

  @Post('testRetrait')
  async testRetrait() {
    try {
      const hiddenFields = await this.perfectMoneyService.testRetrait();
      return hiddenFields;
    } catch (error) {
      return { error: error.message };
    }
  }

  // transaction
  @Get('transaction-form')
  async getTransactionForm(): Promise<string> {
    try {
      const formHtml = await this.perfectMoneyService.createTransactionForm();
      return formHtml;
    } catch (error) {
      return { error: error.message };
    }
  }

  @Post('transfer-funds')
  async transferFunds(@Body() body: { receveur: string, montant: number, paymentid: string }): Promise<any> {
    try {
      const result = await this.perfectMoneyService.transferFunds(body.receveur, body.montant, body.paymentid);
      return result;
    } catch (error) {
      return { error: error.message };
    }
  }

}