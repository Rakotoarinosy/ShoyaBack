import { Module } from '@nestjs/common';
import { BinanceController } from './binance.controller';
import { BinanceService } from './binance.service';
import { TransactionidModule } from 'src/modeles/transactionid/transactionid.module';
import { TransactionhistoryModule } from 'src/modeles/transactionhistory/transactionhistory.module';
import { CoursModule } from 'src/modeles/cours/cours.module';
import { SoldeuserModule } from 'src/modeles/soldeuser/soldeuser.module';
import { SoldeshoyaModule } from 'src/modeles/soldeshoya/soldeshoya.module';

@Module({
  imports: [TransactionidModule,TransactionhistoryModule,CoursModule,SoldeuserModule,SoldeshoyaModule],
  controllers: [BinanceController],
  providers: [BinanceService]
})
export class BinanceModule {}
