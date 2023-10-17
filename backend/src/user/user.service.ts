// user.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entify/user.entify';

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
    const user = await this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

//   async update(id: number, user: User): Promise<User> {
//     await this.userRepository.update(id, user);
//     return this.userRepository.findOne({where:{id}});
//   }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
