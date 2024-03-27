import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {User} from './user.entity';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  async findByEmailAndPin(email: string, pin: string) : Promise<User>{
    return this.userRepository.findOne({ where : {email, pin} });
  }

  async create(user: Partial<User>): Promise<User> {
    const newuser = this.userRepository.create(user);
    return this.userRepository.save(newuser);
  }

  async update(id: number, user: Partial<User>): Promise<User> {
    await this.userRepository.update(id, user);
    return this.userRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  async generateToken(user: User): Promise<string> {
    const payload = { email: user.email, id: user.id };
    return this.jwtService.sign(payload);
  }

  async findByEmail(email: string): Promise<User>{
    return this.userRepository.findOne({ where: { email } });
  }

  hashString(input: string): string {
    const hash = crypto.createHash('sha256'); 
    hash.update(input);
    return hash.digest('hex'); 
  }

}