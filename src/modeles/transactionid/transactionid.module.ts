import { Module } from '@nestjs/common';
import { TransactionidController } from './transactionid.controller';
import { TransactionidService } from './transactionid.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transactionid } from './transaction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Transactionid])],
  controllers: [TransactionidController],
  providers: [TransactionidService],
  exports: [TransactionidService],
})

export class TransactionidModule {}
