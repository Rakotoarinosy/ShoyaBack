import { Controller, Get, Post, Body, Put, Param, Delete, NotFoundException } from '@nestjs/common';
import { TransactionhistoryService } from './transactionhistory.service';
import { TransactionHistory } from './transaction.entity';

@Controller('transactionhistory')
export class TransactionhistoryController {
  constructor(private readonly transactionhistoryService: TransactionhistoryService) {}

  //get all transactionhistory
  @Get()
  async findAll(): Promise<TransactionHistory[]> {
    return this.transactionhistoryService.findAll();
  }

  //get transactionhistory by id
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<TransactionHistory> {
    const user = await this.transactionhistoryService.findOne(id);
    if (!user) {
      throw new NotFoundException('transactionhistory does not exist!');
    } else {
      return user;
    }
  }

  //create transactionhistory
  @Post()
  async create(@Body() transactionhistory: TransactionHistory): Promise<TransactionHistory> {
    return this.transactionhistoryService.create(transactionhistory);
  }

  //update transactionhistory
  @Put(':id')
  async update (@Param('id') id: number, @Body() transactionhistory: TransactionHistory): Promise<any> {
    return this.transactionhistoryService.update(id, transactionhistory);
  }

  //delete transactionhistory
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<any> {
    //handle error if transactionhistory does not exist
    const user = await this.transactionhistoryService.findOne(id);
    if (!user) {
      throw new NotFoundException('transactionhistory does not exist!');
    }
    return this.transactionhistoryService.delete(id);
  }

  @Get()
  async getByUser(@Body('iduser') iduser: number): Promise<TransactionHistory[]>{
    return this.transactionhistoryService.byIdUser(iduser);
  }
}