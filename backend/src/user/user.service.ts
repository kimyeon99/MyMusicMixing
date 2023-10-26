// user.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entify/user.entify';
import * as argon2 from 'argon2'

export class CreateUserDto {
    username: string;
    password: string;
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  private logger: Logger = new Logger('AppGateway');


  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return this.userRepository.findOne({where:{id}});
  }

  async findOneByUsername(username: string): Promise<User>{
    return this.userRepository.findOne({where:{username}});
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    if(!createUserDto.username || !createUserDto.password || /\s/.test(createUserDto.username) || /\s/.test(createUserDto.password)){
      throw new Error('Wrong username or password');
    }

    let user;
    try{
      const hashedPassword = await this.hashingPassword(createUserDto.password);
      createUserDto.password = hashedPassword;
      user = await this.userRepository.create(createUserDto);
    }catch(error){
      this.logger.log("There was an error creating the user", error);
      throw error;
    }
    
    return this.userRepository.save(user);
  }

  async hashingPassword(password){
    try{
      return argon2.hash(password);
    }catch(error){
      this.logger.log("There was an error hasing the password", error);
      throw error;
    }
  }

//   async update(id: number, user: User): Promise<User> {
//     await this.userRepository.update(id, user);
//     return this.userRepository.findOne({where:{id}});
//   }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
