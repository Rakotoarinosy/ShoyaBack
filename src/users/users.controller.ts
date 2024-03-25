import { Controller, Get, Post, Body, Put, Param, Delete, NotFoundException } from '@nestjs/common';
import { UserService } from './users.service';
import { User } from './user.entity';
import { SoldeuserService } from 'src/soldeuser/soldeuser.service';
import { SoldeUser } from 'src/soldeuser/soldeuser.entity';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UserService,
    private readonly soldeUserService: SoldeuserService
    ) {}

  //get all users
  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  //get user by id
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<User> {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException('User does not exist!');
    } else {
      return user;
    }
  }

  @Post('/loginuser/:email/:pin')
  async login(@Param('email') email: string, @Param('pin') pin: string) : Promise<User>{
    const user = await this.usersService.findByEmailAndPin(email,pin);
    if(!user){
        throw new NotFoundException('Verify your identifiants');
    }
    return user;
  }

//create user
@Post()
async create(@Body() user: User): Promise<User> {
  const newuser = await this.usersService.create(user);

  if (newuser && newuser.id) {
    const soldeuser = new SoldeUser();
    soldeuser.iduser = newuser.id;
    soldeuser.solde = 0;
    await this.soldeUserService.create(soldeuser);
  } else {
    throw new Error("Impossible de créer l'utilisateur.");
  }

  return newuser;
}


  //update user
  @Put(':id')
  async update (@Param('id') id: number, @Body() user: User): Promise<any> {
    return this.usersService.update(id, user);
  }

  //delete user
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<any> {
    //handle error if user does not exist
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException('User does not exist!');
    }
    return this.usersService.delete(id);
  }
}