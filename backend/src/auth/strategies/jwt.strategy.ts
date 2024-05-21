import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { plainToInstance } from 'class-transformer';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { JwtParams, JwtPayload } from '../auth.type';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  public constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('app.jwtSecretKey'),
    });
  }

  public async validate(payload: JwtPayload): Promise<JwtParams> {
    return plainToInstance(JwtParams, {
      accountId: payload.sub,
      accountEmail: payload.accountEmail,
      accountType: payload.accountType,
    });
  }
}
