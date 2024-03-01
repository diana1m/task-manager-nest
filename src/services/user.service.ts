import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'db/entities';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existUser = await this.userRepository.findOne({
      where: {
        email: createUserDto.email,
      },
    });
    if (existUser) throw new BadRequestException('This email already exist!');

    const saltOrRounds = 10;
    const hash = await bcrypt.hash(createUserDto.password, saltOrRounds);
    const user = await this.userRepository.save({
      email: createUserDto.email,
      password: hash,
    });
    const token = this.jwtService.sign({ email: createUserDto.email });
    return { user, token };
  }

  async findOne(email: string) {
    return await this.userRepository.findOne({
      where: { email },
      relations: { tasks: true },
    });
  }
}
