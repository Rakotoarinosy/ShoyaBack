import { Module } from '@nestjs/common';
import { TransactionidController } from './transactionid.controller';
import { TransactionidService } from './transactionid.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transactionid } from './transaction.entity';
import { UserService } from 'src/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Transactionid])],
  controllers: [TransactionidController],
  providers: [TransactionidService]
})

export class TransactionidModule {}
