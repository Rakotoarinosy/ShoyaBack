import { Module } from '@nestjs/common';
import { KycController } from './kyc.controller';
import { KycService } from './kyc.service';
import { KYC } from './kyc.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([KYC])],
  controllers: [KycController],
  providers: [KycService]
})
export class KycModule {}
