import { Module } from '@nestjs/common';
import { AdressenetworkController } from './adressenetwork.controller';
import { AdressenetworkService } from './adressenetwork.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdresseNetwork } from './adressenetwork.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AdresseNetwork])],
  controllers: [AdressenetworkController],
  providers: [AdressenetworkService]
})
export class AdressenetworkModule {}