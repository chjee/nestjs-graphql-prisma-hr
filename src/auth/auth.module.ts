import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from '../common/guards/jwt.strategy';
import { UsersModule } from '../users/users.module';
import { getJwtSecret } from '../common/utils/jwt-secret.util';
import { jwtConstants } from '../common/constants/jwt.constants';

@Module({
  imports: [
    ConfigModule,
    UsersModule,
    JwtModule.registerAsync({
      global: true,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: getJwtSecret(
          configService.get<string>(jwtConstants.secretEnvKey),
        ),
        signOptions: { expiresIn: '10m' },
      }),
    }),
  ],
  providers: [AuthResolver, AuthService, JwtStrategy],
})
export class AuthModule {}
