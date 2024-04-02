import { Module } from '@nestjs/common';
import { PerfectmoneyController } from './perfectmoney.controller';
import { Perfectmoneyservice } from './perfectmoney.service';

@Module({
  controllers: [PerfectmoneyController],
  providers: [Perfectmoneyservice]
})
export class PerfectmoneyModule {}
