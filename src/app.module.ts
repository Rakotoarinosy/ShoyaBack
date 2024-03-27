import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modeles/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KycModule } from './modeles/kyc/kyc.module';
import { PhoneModule } from './modeles/phone/phone.module';
import { CoursModule } from './modeles/cours/cours.module';
import { AdresseusdtModule } from './modeles/adresseusdt/adresseusdt.module';
import { BinanceModule } from './modeles/binance/binance.module';
import { TransactionidModule } from './modeles/transactionid/transactionid.module';
import { TransactionhistoryModule } from './modeles/transactionhistory/transactionhistory.module';
import { SoldeuserModule } from './modeles/soldeuser/soldeuser.module';
import { SoldeshoyaModule } from './modeles/soldeshoya/soldeshoya.module';
import { AdressecryptoshoyaModule } from './modeles/adressecryptoshoya/adressecryptoshoya.module';
import { AdressenetworkModule } from './modeles/adressenetwork/adressenetwork.module';

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
    SoldeshoyaModule,
    AdressecryptoshoyaModule,
    AdressenetworkModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
