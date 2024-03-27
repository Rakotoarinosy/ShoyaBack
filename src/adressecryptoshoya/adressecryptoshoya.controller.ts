import { Controller, Get, Post, Body, Put, Param, Delete, NotFoundException } from '@nestjs/common';
import { AdresseCryptoShoya } from './adressecryptoshoya.entity';
import { AdressecryptoshoyaService } from './adressecryptoshoya.service';

@Controller('adressecryptoshoya')
export class AdressecryptoshoyaController {
  constructor(private readonly adresseCryptoShoyaService: AdressecryptoshoyaService) {}

  //get all cryptoshoyaadresse
  @Get()
  async findAll(): Promise<AdresseCryptoShoya[]> {
    return this.adresseCryptoShoyaService.findAll();
  }

  //get cryptoshoyaadresse by id
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<AdresseCryptoShoya> {
    const cryptoshoyaadresse = await this.adresseCryptoShoyaService.findOne(id);
    if (!cryptoshoyaadresse) {
      throw new NotFoundException('cryptoshoyaadresse does not exist!');
    } else {
      return cryptoshoyaadresse;
    }
  }

  //create cryptoshoyaadresse
  @Post()
  async create(@Body() cryptoshoyaadresse: AdresseCryptoShoya): Promise<AdresseCryptoShoya> {
    return this.adresseCryptoShoyaService.create(cryptoshoyaadresse);
  }

  //update cryptoshoyaadresse
  @Put(':id')
  async update (@Param('id') id: number, @Body() cryptoshoyaadresse: AdresseCryptoShoya): Promise<any> {
    return this.adresseCryptoShoyaService.update(id, cryptoshoyaadresse);
  }

  //delete cryptoshoyaadresse
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<any> {
    //handle error if cryptoshoyaadresse does not exist
    const cryptoshoyaadresse = await this.adresseCryptoShoyaService.findOne(id);
    if (!cryptoshoyaadresse) {
      throw new NotFoundException('cryptoshoyaadresse does not exist!');
    }
    return this.adresseCryptoShoyaService.delete(id);
  }
}