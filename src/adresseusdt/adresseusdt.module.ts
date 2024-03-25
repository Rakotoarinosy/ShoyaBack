import { Module } from '@nestjs/common';
import { AdresseusdtController } from './adresseusdt.controller';
import { AdresseusdtService } from './adresseusdt.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdresseUSDT } from './adresseusdt.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AdresseUSDT])],
  controllers: [AdresseusdtController],
  providers: [AdresseusdtService]
})
export class AdresseusdtModule {}
