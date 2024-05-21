import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';

@Injectable()
export class JwtConfigService implements JwtOptionsFactory {
  public constructor(private readonly configService: ConfigService) {}

  public createJwtOptions(): JwtModuleOptions {
    return {
      global: true,
      secret: this.configService.get<string>('app.jwtSecretKey'),
      signOptions: { expiresIn: '7d' },
    };
  }
}
