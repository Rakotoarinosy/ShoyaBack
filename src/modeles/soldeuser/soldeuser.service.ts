import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SoldeUser } from './soldeuser.entity';

@Injectable()
export class SoldeuserService {
  constructor(
    @InjectRepository(SoldeUser)
    private soldeUserRepository: Repository<SoldeUser>,
  ) {}

  async findAll(): Promise<SoldeUser[]> {
    return this.soldeUserRepository.find();
  }

  async findOne(id: number): Promise<SoldeUser> {
    return this.soldeUserRepository.findOne({ where: { id } });
  }

  async create(soldeuser: Partial<SoldeUser>): Promise<SoldeUser> {
    const newsoldeuser = this.soldeUserRepository.create(soldeuser);
    return this.soldeUserRepository.save(newsoldeuser);
  }

  async update(id: number, soldeuser: Partial<SoldeUser>): Promise<SoldeUser> {
    await this.soldeUserRepository.update(id, soldeuser);
    return this.soldeUserRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.soldeUserRepository.delete(id);
  }

  async findByUser(iduser: number): Promise<SoldeUser[]> {
    const listeuser = await this.findAll();
    const liste: SoldeUser[] = []; 
    for (let i = 0; i < listeuser.length; i++) {
      if (listeuser[i].iduser === iduser) {
        liste.push(listeuser[i]);
      }
    }
    return liste;
  }

}


