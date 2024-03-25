import { Module } from '@nestjs/common';
import { TransactionhistoryController } from './transactionhistory.controller';
import { TransactionhistoryService } from './transactionhistory.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionHistory } from './transaction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TransactionHistory])],
  controllers: [TransactionhistoryController],
  providers: [TransactionhistoryService],
  exports: [TransactionhistoryService],
})
export class TransactionhistoryModule {}
