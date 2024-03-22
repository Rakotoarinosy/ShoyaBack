import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { KYC } from './kyc.entity';

@Injectable()
export class KycService {
  constructor(
    @InjectRepository(KYC)
    private KYCRepository: Repository<KYC>,
  ) {}

  async findAll(): Promise<KYC[]> {
    return this.KYCRepository.find();
  }

  async findOne(id: number): Promise<KYC> {
    return this.KYCRepository.findOne({ where: { id } });
  }

  async create(user: Partial<KYC>): Promise<KYC> {
    const newuser = this.KYCRepository.create(user);
    return this.KYCRepository.save(newuser);
  }

  async update(id: number, user: Partial<KYC>): Promise<KYC> {
    await this.KYCRepository.update(id, user);
    return this.KYCRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.KYCRepository.delete(id);
  }

  async findByUser(iduser: number): Promise<KYC[]>{
    return this.KYCRepository.find({ where: {iduser} });
  }
}