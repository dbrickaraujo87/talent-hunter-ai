import { Body, Injectable, UnauthorizedException, Req } from '@nestjs/common';
import { compare } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auth } from './entities/auth.entity';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<Auth> {
    const user = await this.authRepository.findOne({ where: { email } });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isPasswordValid = await compare(pass, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }
    return user;
  }

  async login(@Body() loginDto: LoginDto) {
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

  getProfile(@Req() req: any) {
    const userId = req.params.userId;
    return this.authRepository.findOne({ where: { id: userId } });
  }
}
