import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cours } from './cours.entity';

@Injectable()
export class CoursService {
  constructor(
    @InjectRepository(Cours)
    private coursRepository: Repository<Cours>,
  ) {}

  async findAll(): Promise<Cours[]> {
    return this.coursRepository.find();
  }

  async findOne(id: number): Promise<Cours> {
    return this.coursRepository.findOne({ where: { id } });
  }

  async create(cours: Partial<Cours>): Promise<Cours> {
    const newuser = this.coursRepository.create(cours);
    return this.coursRepository.save(newuser);
  }

  async update(id: number, cours: Partial<Cours>): Promise<Cours> {
    await this.coursRepository.update(id, cours);
    return this.coursRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.coursRepository.delete(id);
  }

  async findByName(actif: string): Promise<Cours> {
    const lowerActif = actif.toLowerCase();
    return this.coursRepository.findOne({ where: { actif: lowerActif } });
  }    
}
