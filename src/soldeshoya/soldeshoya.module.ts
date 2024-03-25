import { Module } from '@nestjs/common';
import { SoldeshoyaController } from './soldeshoya.controller';
import { SoldeshoyaService } from './soldeshoya.service';

@Module({
  controllers: [SoldeshoyaController],
  providers: [SoldeshoyaService]
})
export class SoldeshoyaModule {}
