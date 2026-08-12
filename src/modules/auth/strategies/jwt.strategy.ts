import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      // Extrai o token do cabeçalho "Authorization: Bearer <TOKEN>"
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // Rejeita tokens expirados automaticamente
      secretOrKey: configService.get<string>('JWT_SECRET') || 'defaultSecret', // Use a default secret if not provided
    });
  }

  // O valor retornado aqui é automaticamente injetado no objeto `req.user` dos Controllers!
  async validate(payload: any) {
    return {
      id: payload.sub,
      email: payload.email,
      role: payload.role,
      companyId: payload.companyId,
    };
  }
}
