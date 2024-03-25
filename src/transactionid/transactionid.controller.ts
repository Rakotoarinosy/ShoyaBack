import { Controller, Get, Post, Body, Put, Param, Delete, NotFoundException } from '@nestjs/common';
import { TransactionidService } from './transactionid.service';
import { Transactionid } from './transaction.entity';

@Controller('transactionid')
export class TransactionidController {
  constructor(
    private readonly transactionidService: TransactionidService,
    ) {}

  //get all transactionid
  @Get()
  async findAll(): Promise<Transactionid[]> {
    return this.transactionidService.findAll();
  }

  //get transactionid by id
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Transactionid> {
    const user = await this.transactionidService.findOne(id);
    if (!user) {
      throw new NotFoundException('transactionid does not exist!');
    } else {
      return user;
    }
  }

  //create transactionid
  @Post()
  async create(@Body() transactionid: Transactionid): Promise<Transactionid> {
    return this.transactionidService.create(transactionid);
  }

  //update transactionid
  @Put(':id')
  async update (@Param('id') id: number, @Body() transactionid: Transactionid): Promise<any> {
    return this.transactionidService.update(id, transactionid);
  }

  //delete transactionid
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<any> {
    //handle error if transactionid does not exist
    const user = await this.transactionidService.findOne(id);
    if (!user) {
      throw new NotFoundException('transactionid does not exist!');
    }
    return this.transactionidService.delete(id);
  }
}