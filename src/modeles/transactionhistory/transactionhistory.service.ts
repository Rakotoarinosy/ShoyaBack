import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransactionHistory } from './transaction.entity';

@Injectable()
export class TransactionhistoryService {
  constructor(
    @InjectRepository(TransactionHistory)
    private transactionhistoryRepository: Repository<TransactionHistory>,
  ) {}

  async findAll(): Promise<TransactionHistory[]> {
    return this.transactionhistoryRepository.find();
  }

  async findOne(id: number): Promise<TransactionHistory> {
    return this.transactionhistoryRepository.findOne({ where: { id } });
  }

  async create(transac: Partial<TransactionHistory>): Promise<TransactionHistory> {
    const newtransac = this.transactionhistoryRepository.create(transac);
    return this.transactionhistoryRepository.save(newtransac);
  }

  async update(id: number, transac: Partial<TransactionHistory>): Promise<TransactionHistory> {
    await this.transactionhistoryRepository.update(id, transac);
    return this.transactionhistoryRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.transactionhistoryRepository.delete(id);
  }

  async byIdUser(iduser: number): Promise<TransactionHistory[]>{
    return await this.transactionhistoryRepository.find({ where: { iduser } });
  }
}
