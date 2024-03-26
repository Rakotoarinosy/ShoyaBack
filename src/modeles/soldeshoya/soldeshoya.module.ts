import { Module } from '@nestjs/common';
import { SoldeshoyaController } from './soldeshoya.controller';
import { SoldeshoyaService } from './soldeshoya.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SoldeShoya } from './soldeshoya.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SoldeShoya])],
  controllers: [SoldeshoyaController],
  providers: [SoldeshoyaService],
  exports: [SoldeshoyaService]
})
export class SoldeshoyaModule {}
