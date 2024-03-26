import { Injectable } from '@nestjs/common';
import { log } from 'console';
import * as crypto from 'crypto';
import { RestWalletTypes } from 'src';
import { Spot } from 'src';
import { mockResponse } from 'src/mock_values/restful/wallet/withdraw';

@Injectable()
export class BinanceService {
  private readonly API_KEY = 'nyzn0TfiNciA2kJz93CPpFBedSrgG0yWVIVspD0sldnVsRmlY30fUrJVyI2XaQnf';
  private readonly SECRET_KEY = 'Fr4E8NTJc3FSJcX46NtjZDKtAyKSqddHnLMreXOY7A0JjamuKEcHeYWlx5B3bZRY';
  private readonly BASE_URL = 'https://api.binance.com';

  constructor() {}

  async binanceGet(url: string, payload: any): Promise<any> {
    const date = Date.now();
    let params = {
      ...payload,
      timestamp: +date,
    };
    const query = new URLSearchParams(params).toString();
    const axios = require('axios').default;
    const token = crypto.createHmac('sha256', this.SECRET_KEY).update(query).digest('hex');
    return axios.get(url + '?' + query + '&signature=' + token, {
      headers: {
        'Content-Type': 'application/json',
        'X-MBX-APIKEY': this.API_KEY,
      },
    });
  }

  // FONCTION ILAINA AM RETRAIT
    
  // async depositHistory(): Promise<any> {
  //   try {
  //     const response = await this.binanceGet('https://api.binance.com/sapi/v1/capital/deposit/hisrec', {
  //       coin: 'USDT',
  //     });
  //     return response.data;
  //   } catch (error) {
  //     console.log(error.response.data);
  //   }
  // }

  async depositHistory(): Promise<any> {
    const client = new Spot(this.API_KEY, this.SECRET_KEY, { baseURL: this.BASE_URL });
   
    const options: RestWalletTypes.depositHistoryOptions = {
       coin: 'USDT'
    };
   
    return client.depositHistory(options)
       .then((res: RestWalletTypes.depositHistoryResponse[]) => {
         console.log(res);
         return res;
       })
       .catch(err => {
         console.log(err);
         throw err; 
       });
   }
   

  // FONCTION ILAINA AM DEPOT

  //  async getWithdrawHistory(): Promise<any>{
  //   const client = new Spot(this.API_KEY, this.SECRET_KEY, { baseURL: this.BASE_URL });

  //   const options: RestWalletTypes.withdrawHistoryOptions = {
  //       coin: 'USDT'
  //   };
    
  //     return client.withdrawHistory(options).then((res: RestWalletTypes.withdrawHistoryResponse[]) => {
  //       console.log(res);
  //       })
  //       .catch(err => { console.log(err); });
  //  }

  async getWithdrawHistory(): Promise<any> {
    try {
      const response = await this.binanceGet('https://api.binance.com/sapi/v1/capital/withdraw/history', {
      });
      return response.data;
    } catch (error) {
      console.log(error.response.data);
    }
  }

  async withdraw(amount: number, address: string): Promise<RestWalletTypes.withdrawResponse> {
    const client = new Spot(this.API_KEY, this.SECRET_KEY, { baseURL: this.BASE_URL });
    
    const withdrawOptions: RestWalletTypes.withdrawOptions = {
       network: 'TRX'
    };
   
    return client.withdraw('TRX', address, amount, withdrawOptions)
       .then((res: RestWalletTypes.withdrawResponse) => {
         console.log(res);
         return res;
       })
       .catch(err => {
         console.log(err);
         throw err;
       });
   }
   

   async getNetworkList(): Promise<any> {
    try {
      const response = await this.binanceGet('https://api.binance.com/sapi/v1/capital/config/getall', {
        coin: 'USDT'
      });
      return response.data;
    } catch (error) {
      console.log(error.response.data);
    }
  }
}

















