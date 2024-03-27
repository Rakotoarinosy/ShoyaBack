import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Otp } from './otp.entity';
import * as nodemailer from 'nodemailer';

@Injectable()
export class OtpService {
    private readonly transporter;
    constructor(
    @InjectRepository(Otp)
    private otpRepository: Repository<Otp>,
  )
  {this.transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    port: 587, // Le port SMTP d'Outlook.com
    secure: false, // Vous n'utilisez pas SSL/TLS
    auth: {
      user: 'shoyaexchange@hotmail.com',
      pass: '02JuinFavoris!',
    },
  });}

  async findAll(): Promise<Otp[]> {
    return this.otpRepository.find();
  }

  async findOne(id: number): Promise<Otp> {
    return this.otpRepository.findOne({ where: { id } });
  }

  async findByEmailAndOtp(email: string, code: string): Promise<Otp>{
    return this.otpRepository.findOne({where: {email,code} });
  }

  async findByEmail(email: string): Promise<Otp[]>{
    return this.otpRepository.find({where: {email} });
  }

  async create(otp: Partial<Otp>): Promise<Otp> {
    const newotp = this.otpRepository.create(otp);
    return this.otpRepository.save(newotp);
  }

  async update(id: number, otp: Partial<Otp>): Promise<Otp> {
    await this.otpRepository.update(id, otp);
    return this.otpRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.otpRepository.delete(id);
  }

  async sendOtp(destinataire: string, otp: string): Promise<void> {
    const mailOptions = {
      from: 'shoyaexchange@hotmail.com',
      to: destinataire,
      subject: 'Code OTP',
      text: `Votre code OTP est : ${otp}`,
    };

    await this.transporter.sendMail(mailOptions);
  }

  generateNumericOTP(length: number): string {
    const digits = '0123456789';
    let otp = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * 10);
      otp += digits[randomIndex];
    }
    return otp;
  }
}