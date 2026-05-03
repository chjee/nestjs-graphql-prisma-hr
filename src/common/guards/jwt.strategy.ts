import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { getJwtSecret } from '../utils/jwt-secret.util';
import { jwtConstants } from '../constants/jwt.constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: getJwtSecret(
        configService.get<string>(jwtConstants.secretEnvKey),
      ),
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, name: payload.name };
  }
}
