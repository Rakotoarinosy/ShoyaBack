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

  async transferFunds(): Promise<any> {
    const url = 'https://perfectmoney.com/acct/confirm.asp';
    const params = {
      AccountID: '84905486',
      PassPhrase: 'Steven!Passe13Phrase.',
      Payer_Account: 'U47300434',
      Payee_Account: 'U35215711',
    //   Payee_Account: 'U43296497', compte Fehizoro
      Amount: 3.9,
      PAY_IN: 1,
      PAYMENT_ID: 12222,
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
}