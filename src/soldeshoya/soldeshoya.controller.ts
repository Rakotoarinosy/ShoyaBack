import { Controller, Get, Post, Body, Put, Param, Delete, NotFoundException } from '@nestjs/common';
import { SoldeShoya } from './soldeshoya.entity';
import { SoldeshoyaService } from './soldeshoya.service';

@Controller('soldeshoya')
export class SoldeshoyaController {
  constructor(private readonly soldeshoyaService: SoldeshoyaService) {}

  //get all soldeshoya
  @Get()
  async findAll(): Promise<SoldeShoya[]> {
    return this.soldeshoyaService.findAll();
  }

  //get soldeshoya by id
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<SoldeShoya> {
    const user = await this.soldeshoyaService.findOne(id);
    if (!user) {
      throw new NotFoundException('soldeshoya does not exist!');
    } else {
      return user;
    }
  }

  //create soldeshoya
  @Post()
  async create(@Body() soldeshoya: SoldeShoya): Promise<SoldeShoya> {
    return this.soldeshoyaService.create(soldeshoya);
  }

  //update soldeshoya
  @Put(':id')
  async update (@Param('id') id: number, @Body() soldeshoya: SoldeShoya): Promise<any> {
    return this.soldeshoyaService.update(id, soldeshoya);
  }

  //delete user
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<any> {
    //handle error if soldeshoya does not exist
    const sodeshoya = await this.soldeshoyaService.findOne(id);
    if (!sodeshoya) {
      throw new NotFoundException('soldeshoya does not exist!');
    }
    return this.soldeshoyaService.delete(id);
  }
}