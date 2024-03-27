import { Controller, Get, Post, Body, Put, Param, Delete, NotFoundException } from '@nestjs/common';
import { Otp } from './otp.entity';
import { OtpService } from './otp.service';
import { log } from 'console';
import { UserService } from '../users/users.service';
import { User } from '../users/user.entity';
import * as crypto from 'crypto';
import { emit } from 'process';

@Controller('otp')
export class OtpController {
  constructor(
    private readonly otpService: OtpService,
    private readonly userService: UserService
    ) {}

  //get all otp
  @Get()
  async findAll(): Promise<Otp[]> {
    return this.otpService.findAll();
  }

  //get otp by id
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Otp> {
    const user = await this.otpService.findOne(id);
    if (!user) {
      throw new NotFoundException('otp does not exist!');
    } else {
      return user;
    }
  }

  //create otp
  @Post()
  async create(@Body() otp: Otp): Promise<Otp> {
    return this.otpService.create(otp);
  }

  //update otp
  @Put(':id')
  async update (@Param('id') id: number, @Body() otp: Otp): Promise<any> {
    return this.otpService.update(id, otp);
  }

  //delete otp
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<any> {
    //handle error if otp does not exist
    const otp = await this.otpService.findOne(id);
    if (!otp) {
      throw new NotFoundException('otp does not exist!');
    }
    return this.otpService.delete(id);
  }

  @Post('send')
  async sendOtp(@Body('email') email: string): Promise<any> {
    // const otp = this.otpService.generateNumericOTP(6);
    // await this.otpService.sendOtp(email, otp);
    const newotp = new Otp();
    // newotp.code = otp;
    newotp.code = '123456';
    newotp.email = email;
    await this.otpService.create(newotp); 
    return { success: true };
  }

  @Post('verifyotp')
async verifyOtp(@Body() body: { email: string, otp: string }): Promise<any> {
  const otp = await this.otpService.findByEmailAndOtp(body.email,body.otp);
  if(otp==null){
    return { otpNotFound: false };
 }
 else{
    return { otpNotFound: true };
 }
}

@Post('verifyEmail')
async verifyEmail(@Body('email') email : string): Promise<any> {
 const otps = await this.userService.findByEmail(email);
 if(otps==null){
    // Si aucun utilisateur n'est trouvé, retournez un objet avec une propriété indiquant que l'email n'est pas trouvé
    return { emailNotFound: true };
 }
 else{
    // Retournez l'entité utilisateur trouvée
    return otps;
 }
}

@Post('verifypin')
async verifyPin(@Body() body : { email: string, pin: string }) : Promise<any>{
    const user = await this.userService.findByEmail(body.email);
    const hashedPin = this.userService.hashString(body.pin);
    if(user.pin==hashedPin){
        return { pinOK: true, pin: hashedPin }
    }
    else{
        return { pinOK: false }
    }
}

}