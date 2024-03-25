import { Controller, Get, Post, Body, Put, Param, Delete, NotFoundException } from '@nestjs/common';
import { SoldeuserService } from './soldeuser.service';
import { SoldeUser } from './soldeuser.entity';
@Controller('soldeuser')
export class SoldeuserController {
  constructor(private readonly soldeUserService: SoldeuserService) {}

  //get all solduser
  @Get()
  async findAll(): Promise<SoldeUser[]> {
    return this.soldeUserService.findAll();
  }

  //get solduser by id
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<SoldeUser> {
    const user = await this.soldeUserService.findOne(id);
    if (!user) {
      throw new NotFoundException('SoldeUser does not exist!');
    } else {
      return user;
    }
  }

  //create solduser
  @Post()
  async create(@Body() soldeuser: SoldeUser): Promise<SoldeUser> {
    return this.soldeUserService.create(soldeuser);
  }

  //update solduser
  @Put(':id')
  async update (@Param('id') id: number, @Body() soldeuser: SoldeUser): Promise<any> {
    return this.soldeUserService.update(id, soldeuser);
  }

  //delete solduser
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<any> {
    //handle error if solduser does not exist
    const user = await this.soldeUserService.findOne(id);
    if (!user) {
      throw new NotFoundException('SoldeUser does not exist!');
    }
    return this.soldeUserService.delete(id);
  }
}