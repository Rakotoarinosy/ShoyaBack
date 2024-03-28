import { Controller, Get, Post, Body, Put, Param, Delete, NotFoundException } from '@nestjs/common';
import { AdresseNetwork } from './adressenetwork.entity';
import { AdressenetworkService } from './adressenetwork.service';

@Controller('adressenetwork')
export class AdressenetworkController {
  constructor(private readonly adresseNetworkService: AdressenetworkService) {}

  //get all adressenetwork
  @Get()
  async findAll(): Promise<AdresseNetwork[]> {
    return this.adresseNetworkService.findAll();
  }

  //get adressenetwork by id
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<AdresseNetwork> {
    const adressenetwork = await this.adresseNetworkService.findOne(id);
    if (!adressenetwork) {
      throw new NotFoundException('adressenetwork does not exist!');
    } else {
      return adressenetwork;
    }
  }

  //create adressenetwork
  @Post()
  async create(@Body() adressenetwork: AdresseNetwork): Promise<AdresseNetwork> {
    return this.adresseNetworkService.create(adressenetwork);
  }

  //update adressenetwork
  @Put(':id')
  async update (@Param('id') id: number, @Body() adressenetwork: AdresseNetwork): Promise<any> {
    return this.adresseNetworkService.update(id, adressenetwork);
  }

  //delete adressenetwork
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<any> {
    //handle error if adressenetwork does not exist
    const adressenetwork = await this.adresseNetworkService.findOne(id);
    if (!adressenetwork) {
      throw new NotFoundException('adressenetwork does not exist!');
    }
    return this.adresseNetworkService.delete(id);
  }
}