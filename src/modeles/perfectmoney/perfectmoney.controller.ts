import { Controller } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { Perfectmoneyservice } from './perfectmoney.service';

@Controller('perfectmoney')
export class PerfectmoneyController {
    constructor(private readonly perfectMoneyService: Perfectmoneyservice){}
    
    
    @Get('get-balance')
  async fetchData() {
    try {
      const result = await this.perfectMoneyService.fetchAPI();
      return result;
    } catch (error) {
      return { error: error.message };
    }
  }

  @Get('transfer')
  async transferFunds(): Promise<any> {
    try {
      const result = await this.perfectMoneyService.transferFunds();
      return result;
    } catch (error) {
      return { error: error.message };
    }
  }

}