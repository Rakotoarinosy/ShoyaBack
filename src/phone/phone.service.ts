import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Phone } from './phone.entity';

@Injectable()
export class PhoneService {
  constructor(
    @InjectRepository(Phone)
    private phoneRepository: Repository<Phone>,
  ) {}

  async findAll(): Promise<Phone[]> {
    return this.phoneRepository.find();
  }

  async findOne(id: number): Promise<Phone> {
    return this.phoneRepository.findOne({ where: { id } });
  }

  async create(phone: Partial<Phone>): Promise<Phone> {
    const newphone = this.phoneRepository.create(phone);
    return this.phoneRepository.save(newphone);
  }

  async update(id: number, phone: Partial<Phone>): Promise<Phone> {
    await this.phoneRepository.update(id, phone);
    return this.phoneRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.phoneRepository.delete(id);
  }
}

