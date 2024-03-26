import { Injectable } from '@nestjs/common';
import { AdresseUSDT } from './adresseusdt.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AdresseusdtService {
    constructor(
        @InjectRepository(AdresseUSDT)
        private adresseUSDTRepository: Repository<AdresseUSDT>,
      ) {}
    
      async findAll(): Promise<AdresseUSDT[]> {
        return this.adresseUSDTRepository.find();
      }
    
      async findOne(id: number): Promise<AdresseUSDT> {
        return this.adresseUSDTRepository.findOne({ where: { id } });
      }
    
      async create(user: Partial<AdresseUSDT>): Promise<AdresseUSDT> {
        const newuser = this.adresseUSDTRepository.create(user);
        return this.adresseUSDTRepository.save(newuser);
      }
    
      async update(id: number, user: Partial<AdresseUSDT>): Promise<AdresseUSDT> {
        await this.adresseUSDTRepository.update(id, user);
        return this.adresseUSDTRepository.findOne({ where: { id } });
      }
    
      async delete(id: number): Promise<void> {
        await this.adresseUSDTRepository.delete(id);
      }

      async findByUser(iduser: number): Promise<AdresseUSDT[]>{
        return this.adresseUSDTRepository.find({ where: {iduser} });
      }
}