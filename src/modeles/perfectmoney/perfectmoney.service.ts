// perfect-money.service.ts

import { Injectable } from '@nestjs/common';
import { log } from 'console';
import axios from 'axios';
import { parse } from 'node-html-parser';

@Injectable()
export class Perfectmoneyservice {
  async fetchAPI() {
    const apiUrl = 'https://perfectmoney.com/acct//balance.asp';
    const params = {
      AccountID: '84905486',
      PassPhrase: 'Steven!Passe13Phrase.',
    };

    const queryString = Object.keys(params)
      .map(key => key + '=' + params[key])
      .join('&');

    try {
      const response = await fetch(`${apiUrl}?${queryString}`); 

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.text();
      return data;
    } catch (error) {
      throw new Error('Error fetching API: ' + error.message);
    }
  }

  // DEPOT : ISIKA MANDEFA USDT MAKANY AM CLIENT

  async transferFunds(receveur: string, montant: number, paymentid: string): Promise<any> {
    const url = 'https://perfectmoney.com/acct/confirm.asp';
    const params = {
      AccountID: '84905486', // OVAINA COMPTE SHOYA EXCHANGE
      PassPhrase: 'Steven!Passe13Phrase.', // OVAINA COMPTE SHOYA EXCHANGE
      Payer_Account: 'U47300434', // OVAINA COMPTE SHOYA EXCHANGE
      Payee_Account: receveur,
      Amount: montant,
      PAY_IN: 1,
      PAYMENT_ID: paymentid,
    };

    try {
      const response = await axios.get(url, { params });
      const html = response.data;
      const hiddenFields = this.parseHiddenFields(html);
      return hiddenFields;
    } catch (error) {
      throw new Error('Error transferring funds: ' + error.message);
    }
  }

  private parseHiddenFields(html: string): any {
    const root = parse(html);
    const inputElements = root.querySelectorAll('input[name]');
    const hiddenFields: any = {};

    inputElements.forEach(element => {
      const name = element.getAttribute('name');
      const value = element.getAttribute('value');
      hiddenFields[name] = value;
    });

    return hiddenFields;
  }

  async testRetrait(): Promise<any> {
    const url = 'https://perfectmoney.com/acct/confirm.asp';
    const params = {
      AccountID: '84905486', // OVAINA COMPTE UTILISATEUR
      PassPhrase: 'Steven!Passe13Phrase.', // OVAINA COMPTE UTILISATEUR
      Payer_Account: 'U47300434', // OVAINA COMPTE SHOYA EXCHANGE
      PAYEE_ACCOUNT : 'U35215711', // OVAINA COMPTE SHOYA
      PAYEE_NAME : 'Razafimahefa Steven',
      Amount : 1,
      PAYMENT_UNITS : 'USD',
      PAYMENT_URL : 'https://perfectmoney.com/api/step1.asp',
      NOPAYMENT_URL : 'https://perfectmoney.com/api/step1.asp',
    };

    try {
      const response = await axios.get(url, { params });
      const html = response.data;
      const hiddenFields = this.parseHiddenFields(html);
      return hiddenFields;
    } catch (error) {
      throw new Error('Error transferring funds: ' + error.message);
    }
  }

  // transaction
  async createTransactionForm(): Promise<string> {
    const PAYEE_ACCOUNT = 'U43296497'; // Remplacez par votre numéro de compte Perfect Money
    const PAYEE_NAME = PAYEE_ACCOUNT; // Remplacez par votre nom d'entreprise
    const PAYMENT_AMOUNT = '100'; // Montant du paiement
    const PAYMENT_UNITS = 'USD'; // Unité de paiement (par exemple, USD, EUR, etc.)
    const PAYMENT_ID = '123456'; // Identifiant de paiement (facultatif)
    const PAYMENT_URL = 'https://perfectmoney.com/api/step1.asp';
    const NOPAYMENT_URL = 'https://perfectmoney.com/api/step1.asp';

    const apiUrl = 'https://perfectmoney.com/api/step1.asp';

    const params = new URLSearchParams({
      PAYEE_ACCOUNT,
      PAYEE_NAME,
      PAYMENT_AMOUNT,
      PAYMENT_UNITS,
      PAYMENT_ID,
      PAYMENT_URL,
      NOPAYMENT_URL,
    });

    try {
      const response = await axios.post(apiUrl, params.toString(), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });

      return response.data;
    } catch (error) {
      throw new Error('Error creating transaction form: ' + error.message);
    }
  }


}