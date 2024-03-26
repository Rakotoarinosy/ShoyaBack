import { Controller, Get, Post, Body, Put, Param, Delete, NotFoundException } from '@nestjs/common';
import { Phone } from './phone.entity';
import { PhoneService } from './phone.service';

@Controller('phone')
export class PhoneController {
  constructor(private readonly phoneService: PhoneService) {}

  //get all phones
  @Get()
  async findAll(): Promise<Phone[]> {
    return this.phoneService.findAll();
  }

  //get phone by id
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Phone> {
    const user = await this.phoneService.findOne(id);
    if (!user) {
      throw new NotFoundException('Phone does not exist!');
    } else {
      return user;
    }
  }

  //create phone
  @Post()
  async create(@Body() phone: Phone): Promise<Phone> {
    return this.phoneService.create(phone);
  }

  //update phone
  @Put(':id')
  async update (@Param('id') id: number, @Body() phone: Phone): Promise<any> {
    return this.phoneService.update(id, phone);
  }

  //delete phone
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<any> {
    //handle error if user does not exist
    const user = await this.phoneService.findOne(id);
    if (!user) {
      throw new NotFoundException('Phone does not exist!');
    }
    return this.phoneService.delete(id);
  }
}