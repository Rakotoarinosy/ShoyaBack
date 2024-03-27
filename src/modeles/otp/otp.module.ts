import { Module } from '@nestjs/common';
import { OtpController } from './otp.controller';
import { OtpService } from './otp.service';
import { Otp } from './otp.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Otp]),UsersModule],
  controllers: [OtpController],
  providers: [OtpService]
})
export class OtpModule {}
