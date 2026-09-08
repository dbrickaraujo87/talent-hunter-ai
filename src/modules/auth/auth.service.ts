import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { compare } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/users.entity';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  private readonly logger: Logger = new Logger(AuthService.name);

  constructor(
    @InjectRepository(User)
    private readonly authRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<User> {
    if (!email || !pass) {
      this.logger.warn('Email and password are required for validation');
      throw new UnauthorizedException('Email and password are required');
    }
    const user = await this.authRepository.findOne({
      where: { email },
      select: {
        id: true,
        email: true,
        password: true,
        role: true,
        companyId: true,
      },
    });

    if (!user) {
      this.logger.warn(`User not found for email: ${email}`);
      throw new UnauthorizedException('User not found');
    }

    const isPasswordValid = await compare(pass, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }
    return user;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);

    // Informação pública gravada DENTRO do token JWT
    const payload = {
      email: user.email,
      sub: user.id, // 'sub' é a convenção padrão para o ID do usuário
      role: user.role, // Perfil do usuário (SUPER_ADMIN, RECRUITER, etc)
      companyId: user.companyId,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        companyId: user.companyId,
      },
    };
  }

  getProfile(userId: string) {
    if (!userId) {
      throw new UnauthorizedException('User ID is required');
    }
    return this.authRepository.findOne({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        companyId: true,
        isActive: true,
        createdAt: true,
      },
      where: {
        id: userId,
        isActive: true,
      },
    });
  }
}
