import { Controller, Get, Post, Body, Put, Param, Delete, NotFoundException } from '@nestjs/common';
import { CoursService } from './cours.service';
import { Cours } from './cours.entity';

@Controller('cours')
export class CoursController {
  constructor(private readonly coursService: CoursService) {}

  //get all cours
  @Get()
  async findAll(): Promise<Cours[]> {
    return this.coursService.findAll();
  }

  //get cours by id
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Cours> {
    const user = await this.coursService.findOne(id);
    if (!user) {
      throw new NotFoundException('Cours does not exist!');
    } else {
      return user;
    }
  }

  //create cours
  @Post()
  async create(@Body() user: Cours): Promise<Cours> {
    return this.coursService.create(user);
  }

  //update cours
  @Put(':id')
  async update (@Param('id') id: number, @Body() user: Cours): Promise<any> {
    return this.coursService.update(id, user);
  }

  //delete cours
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<any> {
    //handle error if user does not exist
    const user = await this.coursService.findOne(id);
    if (!user) {
      throw new NotFoundException('Cours does not exist!');
    }
    return this.coursService.delete(id);
  }
}