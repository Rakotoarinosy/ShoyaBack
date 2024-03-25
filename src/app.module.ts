import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KycModule } from './kyc/kyc.module';
import { PhoneModule } from './phone/phone.module';
import { CoursModule } from './cours/cours.module';
import { AdresseusdtModule } from './adresseusdt/adresseusdt.module';
import { BinanceModule } from './binance/binance.module';
import { TransactionidModule } from './transactionid/transactionid.module';
import { TransactionhistoryModule } from './transactionhistory/transactionhistory.module';
import { SoldeuserModule } from './soldeuser/soldeuser.module';
import { SoldeshoyaModule } from './soldeshoya/soldeshoya.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'shoya',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UsersModule,
    KycModule,
    PhoneModule,
    CoursModule,
    AdresseusdtModule,
    BinanceModule,
    TransactionidModule,
    TransactionhistoryModule,
    SoldeuserModule,
    SoldeshoyaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
