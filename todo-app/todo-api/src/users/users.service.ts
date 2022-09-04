import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    try {
      const users = this.usersRepository.find();
      return users;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findById(id: string): Promise<User> {
    try {
      const user = this.usersRepository.findOneByOrFail({id});
      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
