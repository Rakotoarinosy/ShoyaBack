import { Controller, Get, Post, Body, Put, Param, Delete, NotFoundException } from '@nestjs/common';
import { KycService } from './kyc.service';
import { KYC } from './kyc.entity';

@Controller('kyc')
export class KycController {
  constructor(private readonly KYCService: KycService) {}

  //get all users
  @Get()
  async findAll(): Promise<KYC[]> {
    return this.KYCService.findAll();
  }

  //get kyc by id
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<KYC> {
    const kyc = await this.KYCService.findOne(id);
    if (!kyc) {
      throw new NotFoundException('User does not exist!');
    } else {
      return kyc;
    }
  }

  @Get('/byiduser/:iduser')
  async find(@Param('iduser') iduser: number): Promise<KYC[]> {
      const kycList = await this.KYCService.findByUser(iduser);
      if (kycList.length === 0) {
          throw new NotFoundException('No KYC records found for this user!');
      } else {
          return kycList;
      }
  }
  
  //create user
  @Post()
  async create(@Body() kyc: KYC): Promise<KYC> {
    const iduser = kyc.iduser;
    const liste = await this.KYCService.findAll();
    let exists = false;
    for(let i=0; i<liste.length; i++){
        if(liste[i].iduser == iduser){
            exists = true;
        }
    }
    if(exists){
        throw new NotFoundException('User a deja une KYC');
    }
    return this.KYCService.create(kyc);
  }

  //update user
  @Put(':id')
  async update (@Param('id') id: number, @Body() kyc: KYC): Promise<any> {
    return this.KYCService.update(id, kyc);
  }

  //delete user
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<any> {
    //handle error if user does not exist
    const kyc = await this.KYCService.findOne(id);
    if (!kyc) {
      throw new NotFoundException('KYC does not exist!');
    }
    return this.KYCService.delete(id);
  }
}