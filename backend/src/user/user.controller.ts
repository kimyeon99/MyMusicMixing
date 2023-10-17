// user.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../entify/user.entify';

export class CreateUserDto {
    username: string;
    password: string;
}

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(Number(id));
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.create(createUserDto);
  }

//   @Put(':id')
//   update(@Param('id') id: string, @Body() user: User): Promise<User> {
//     return this.userService.update(Number(id), user);
//   }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.userService.remove(Number(id));
  }
}
