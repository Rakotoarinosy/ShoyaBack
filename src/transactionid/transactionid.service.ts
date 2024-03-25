import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transactionid } from './transaction.entity';
import { User } from 'src/users/user.entity';

@Injectable()
export class TransactionidService {
  constructor(
    @InjectRepository(Transactionid)
    private transactionidRepository: Repository<Transactionid>,
  ) {}

  async findAll(): Promise<Transactionid[]> {
    return this.transactionidRepository.find();
  }

  async findOne(id: number): Promise<Transactionid> {
    return this.transactionidRepository.findOne({ where: { id } });
  }

  async create(transactionid: Partial<Transactionid>): Promise<Transactionid> {
    const newtransaction = this.transactionidRepository.create(transactionid);
    return this.transactionidRepository.save(newtransaction);
  }

  async update(id: number, transactionid: Partial<Transactionid>): Promise<Transactionid> {
    await this.transactionidRepository.update(id, transactionid);
    return this.transactionidRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.transactionidRepository.delete(id);
  }
}

