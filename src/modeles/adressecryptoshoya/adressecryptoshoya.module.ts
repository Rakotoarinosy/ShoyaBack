import { Module } from '@nestjs/common';
import { AdressecryptoshoyaController } from './adressecryptoshoya.controller';
import { AdressecryptoshoyaService } from './adressecryptoshoya.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdresseCryptoShoya } from './adressecryptoshoya.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AdresseCryptoShoya])],
  controllers: [AdressecryptoshoyaController],
  providers: [AdressecryptoshoyaService]
})
export class AdressecryptoshoyaModule {}
