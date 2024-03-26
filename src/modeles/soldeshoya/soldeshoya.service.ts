import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SoldeShoya } from './soldeshoya.entity';

export class SoldeshoyaService {
  constructor(
    @InjectRepository(SoldeShoya)
    private soldeshoyaRepository: Repository<SoldeShoya>,
  ) {}

  async findAll(): Promise<SoldeShoya[]> {
    return this.soldeshoyaRepository.find();
  }

  async findOne(id: number): Promise<SoldeShoya> {
    return this.soldeshoyaRepository.findOne({ where: { id } });
  }

  async create(soldeshoya: Partial<SoldeShoya>): Promise<SoldeShoya> {
    const newsoldeshoya = this.soldeshoyaRepository.create(soldeshoya);
    return this.soldeshoyaRepository.save(newsoldeshoya);
  }

  async update(id: number, soldeshoya: Partial<SoldeShoya>): Promise<SoldeShoya> {
    await this.soldeshoyaRepository.update(id, soldeshoya);
    return this.soldeshoyaRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.soldeshoyaRepository.delete(id);
  }
}

