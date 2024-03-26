import { Injectable } from '@nestjs/common';
import { log } from 'console';
import * as crypto from 'crypto';

@Injectable()
export class BinanceService {
  private readonly API_KEY = 'nyzn0TfiNciA2kJz93CPpFBedSrgG0yWVIVspD0sldnVsRmlY30fUrJVyI2XaQnf';
  private readonly SECRET_KEY = 'Fr4E8NTJc3FSJcX46NtjZDKtAyKSqddHnLMreXOY7A0JjamuKEcHeYWlx5B3bZRY';

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
    
  async depositHistory(): Promise<any> {
    try {
      const response = await this.binanceGet('https://api.binance.com/sapi/v1/capital/deposit/hisrec', {
        coin: 'USDT',
      });
      return response.data;
    } catch (error) {
      console.log(error.response.data);
    }
  }

  // FONCTION ILAINA AM DEPOT

  async getWithdrawHistory(): Promise<any> {
    try {
      const response = await this.binanceGet('https://api.binance.com/sapi/v1/capital/withdraw/history', {
        coin: 'USDT',
      });
      return response.data;
    } catch (error) {
      console.log(error.response.data);
    }
  }


















  async getNetworkList(): Promise<any> {
    try {
      const response = await this.binanceGet('https://api.binance.com/sapi/v1/capital/config/getall', {
        coin: 'USDT',
      });
      return response.data;
    } catch (error) {
      console.log(error.response.data);
    }
  }
}