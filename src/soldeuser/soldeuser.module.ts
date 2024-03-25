import { Module } from '@nestjs/common';
import { SoldeuserController } from './soldeuser.controller';
import { SoldeuserService } from './soldeuser.service';
import { SoldeUser } from './soldeuser.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([SoldeUser])],
  controllers: [SoldeuserController],
  providers: [SoldeuserService]
})
export class SoldeuserModule {}
