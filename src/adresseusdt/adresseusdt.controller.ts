import { Controller, Get, Post, Body, Put, Param, Delete, NotFoundException } from '@nestjs/common';
import { AdresseUSDT } from './adresseusdt.entity';
import { AdresseusdtService } from './adresseusdt.service';

@Controller('adresseusdt')
export class AdresseusdtController {
  constructor(private readonly adresseUSDTService: AdresseusdtService) {}

  //get all adresses
  @Get()
  async findAll(): Promise<AdresseUSDT[]> {
    return this.adresseUSDTService.findAll();
  }

  //get adresse by id
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<AdresseUSDT> {
    const adresse = await this.adresseUSDTService.findOne(id);
    if (!adresse) {
      throw new NotFoundException('Adresse does not exist!');
    } else {
      return adresse;
    }
  }

  @Get('/byiduser/:iduser')
  async findByUser(@Param('iduser') iduser: number): Promise<AdresseUSDT[]>{
    return this.adresseUSDTService.findByUser(iduser);
  }

  //create adresse
  @Post()
  async create(@Body() adresse: AdresseUSDT): Promise<AdresseUSDT> {
    return this.adresseUSDTService.create(adresse);
  }

  //update adresse
  @Put(':id')
  async update (@Param('id') id: number, @Body() adresse: AdresseUSDT): Promise<any> {
    return this.adresseUSDTService.update(id, adresse);
  }

  //delete adresse
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<any> {
    const adresse = await this.adresseUSDTService.findOne(id);
    if (!adresse) {
      throw new NotFoundException('Adresse does not exist!');
    }
    return this.adresseUSDTService.delete(id);
  }
}