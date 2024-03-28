import { Controller, Get, Post, Body, Put, Param, Delete, NotFoundException } from '@nestjs/common';
import { UserService } from './users.service';
import { User } from './user.entity';
import { SoldeuserService } from 'src/modeles/soldeuser/soldeuser.service';
import { SoldeUser } from 'src/modeles/soldeuser/soldeuser.entity';
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UserService,
    private readonly soldeUserService: SoldeuserService
    ) {}
  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<User> {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException('User does not exist!');
    } else {
      return user;
    }
  }

  @Post('/login')
  async login(@Body() credentials: { email: string; pin: string }): Promise<{ token: string }> {
    const user = await this.usersService.findByEmailAndPin(credentials.email, credentials.pin);
    if (!user) {
      throw new NotFoundException('Verify your credentials');
    }
    const token = await this.usersService.generateToken(user);
    return { token };
  }
  
  @Post()
  async create(@Body() user: User): Promise<User> {
    console.log('MAKATO AM CREATE USER');
    user.pin = this.usersService.hashString(user.pin);
    const newUser = await this.usersService.create(user);
    if (!newUser || !newUser.id) {
      throw new NotFoundException('Failed to create user');
    }
    const soldeuser = new SoldeUser();
    soldeuser.iduser = newUser.id;
    soldeuser.solde = 0;
    await this.soldeUserService.create(soldeuser);
    return newUser;
  }

  @Post('/validate-token')
  async validateToken(@Body('token') token: string): Promise<User>{
    const user = this.usersService.validateToken(token);
    if(user!=null){
      return user;
    }
    else{
      throw new NotFoundException('Invalid Token');
    }
  }

  @Put(':id')
  async update (@Param('id') id: number, @Body() user: User): Promise<any> {
    return this.usersService.update(id, user);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<any> {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException('User does not exist!');
    }
    return this.usersService.delete(id);
  }
}