import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdresseCryptoShoya } from './adressecryptoshoya.entity';

@Injectable()
export class AdressecryptoshoyaService {
  constructor(
    @InjectRepository(AdresseCryptoShoya)
    private cryptoAdresseRepository: Repository<AdresseCryptoShoya>,
  ) {}

  async findAll(): Promise<AdresseCryptoShoya[]> {
    return this.cryptoAdresseRepository.find();
  }

  async findOne(id: number): Promise<AdresseCryptoShoya> {
    return this.cryptoAdresseRepository.findOne({ where: { id } });
  }

  async create(cryptoAdresse: Partial<AdresseCryptoShoya>): Promise<AdresseCryptoShoya> {
    const newcryptoAdresse = this.cryptoAdresseRepository.create(cryptoAdresse);
    return this.cryptoAdresseRepository.save(newcryptoAdresse);
  }

  async update(id: number, cryptoAdresse: Partial<AdresseCryptoShoya>): Promise<AdresseCryptoShoya> {
    await this.cryptoAdresseRepository.update(id, cryptoAdresse);
    return this.cryptoAdresseRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.cryptoAdresseRepository.delete(id);
  }
}
