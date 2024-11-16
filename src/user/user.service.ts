import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto): User {
    return this.userRepository.create(createUserDto);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.userRepository.findOneById(id);
  }

  update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateUserDto & User> {
    return this.userRepository.save(updateUserDto);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
