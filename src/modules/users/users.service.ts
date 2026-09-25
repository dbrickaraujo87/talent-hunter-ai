import { Repository, QueryFailedError } from 'typeorm';
import {
  ConflictException,
  HttpException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { ProxyRouterService } from '../../shared/messaging/proxy-router.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly proxyRouterService: ProxyRouterService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const exists = await this.userRepository.exists({
      where: { name: createUserDto.name },
    });

    if (exists) {
      throw new ConflictException('User name already exists');
    }
    try {
      const newUser = this.userRepository.create(createUserDto);
      await this.userRepository.save(newUser);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      if (error instanceof QueryFailedError) {
        const driverError = error.driverError as {
          code?: string;
          errno?: number;
        };
        //tratamento feito para race condition de unique constraint
        //Postgres: '23505' | MySQL: 1062
        if (driverError?.code === '23505' || driverError?.errno === 1062)
          throw new ConflictException('User name already exists');
      }

      throw new InternalServerErrorException('Unexpected error creating user');
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
