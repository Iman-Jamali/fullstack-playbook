import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthRegisterDTO } from './dto/auth-register.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { AuthLoginDTO } from './dto/auth-login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(authRegisterDTO: AuthRegisterDTO): Promise<void> {
    const { email, password } = authRegisterDTO;
    const user = new User();
    user.email = email;
    user.salt = await bcrypt.genSalt(10);
    user.password = await this.hashPassword(password, user.salt);
    try {
      await user.save();
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Email already exists!');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async login(authLoginDTO: AuthLoginDTO): Promise<{ accessToken: string }> {
    const { email, password } = authLoginDTO;
    try {
      const user = await this.usersRepository.findOneBy({ email });
      if (!user || !(await user.validatePassword(password))) {
        throw new UnauthorizedException('Invalid credentials');
      }
      const accessToken = await this.jwtService.sign({ email, id: user.id });
      return { accessToken };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
