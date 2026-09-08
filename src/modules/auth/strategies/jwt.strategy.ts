import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    //super é usado para chamar o construtor da classe pai (PassportStrategy) e passar as opções de configuração para a estratégia JWT.
    super({
      // Extrai o token do cabeçalho "Authorization: Bearer <TOKEN>"
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // Rejeita tokens expirados automaticamente
      // O TypeScript infere automaticamente que o retorno é 'string' (não undefined)
      // e autocompleta as chaves válidas:
      secretOrKey: configService.getOrThrow<string>('JWT_SECRET', {
        infer: true,
      }),
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
