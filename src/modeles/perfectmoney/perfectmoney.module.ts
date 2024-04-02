import { Module } from '@nestjs/common';
import { PerfectmoneyController } from './perfectmoney.controller';
import { Perfectmoneyservice } from './perfectmoney.service';
import { TransactionidModule } from '../transactionid/transactionid.module';
import { TransactionhistoryModule } from '../transactionhistory/transactionhistory.module';
import { CoursModule } from '../cours/cours.module';
import { SoldeuserModule } from '../soldeuser/soldeuser.module';
import { SoldeshoyaModule } from '../soldeshoya/soldeshoya.module';

@Module({
  imports: [TransactionidModule,TransactionhistoryModule,CoursModule,SoldeuserModule,SoldeshoyaModule],
  controllers: [PerfectmoneyController],
  providers: [Perfectmoneyservice]
})
export class PerfectmoneyModule {}
