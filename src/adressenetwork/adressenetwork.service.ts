import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdresseNetwork } from './adressenetwork.entity';

@Injectable()
export class AdressenetworkService {
  constructor(
    @InjectRepository(AdresseNetwork)
    private adresseNetworkRepository: Repository<AdresseNetwork>,
  ) {}

  async findAll(): Promise<AdresseNetwork[]> {
    return this.adresseNetworkRepository.find();
  }

  async findOne(id: number): Promise<AdresseNetwork> {
    return this.adresseNetworkRepository.findOne({ where: { id } });
  }

  async create(adressenetwork: Partial<AdresseNetwork>): Promise<AdresseNetwork> {
    const newadressenetwork = this.adresseNetworkRepository.create(adressenetwork);
    return this.adresseNetworkRepository.save(newadressenetwork);
  }

  async update(id: number, adressenetwork: Partial<AdresseNetwork>): Promise<AdresseNetwork> {
    await this.adresseNetworkRepository.update(id, adressenetwork);
    return this.adresseNetworkRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.adresseNetworkRepository.delete(id);
  }
}

