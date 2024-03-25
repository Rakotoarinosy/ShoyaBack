import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { SoldeuserModule } from 'src/soldeuser/soldeuser.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), SoldeuserModule],
  controllers: [UsersController],
  providers: [UserService]
})

export class UsersModule {}