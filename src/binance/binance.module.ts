import { Module } from '@nestjs/common';
import { BinanceController } from './binance.controller';
import { BinanceService } from './binance.service';
import { TransactionidModule } from 'src/transactionid/transactionid.module';
import { TransactionhistoryModule } from 'src/transactionhistory/transactionhistory.module';
import { CoursModule } from 'src/cours/cours.module';
import { SoldeuserModule } from 'src/soldeuser/soldeuser.module';
import { SoldeshoyaModule } from 'src/soldeshoya/soldeshoya.module';

@Module({
  imports: [TransactionidModule,TransactionhistoryModule,CoursModule,SoldeuserModule,SoldeshoyaModule],
  controllers: [BinanceController],
  providers: [BinanceService]
})
export class BinanceModule {}
