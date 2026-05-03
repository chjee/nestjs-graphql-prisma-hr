import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignInInput, SignInOutput } from '../users/dto/signin-user';
import { UsersService } from '../users/users.service';
import {
  DUMMY_PASSWORD_HASH,
  UnsupportedPasswordHashError,
  verifyPassword,
} from '../common/utils/password.util';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  private readonly logger = new Logger(AuthService.name);

  async signIn(signInInput: SignInInput): Promise<SignInOutput> {
    const user = await this.usersService.findUser({
      email: signInInput.email,
    });

    const isPasswordValid = await this.isPasswordValid(
      signInInput.password,
      user?.password ?? DUMMY_PASSWORD_HASH,
    );
    if (!user || !isPasswordValid) {
      this.logger.warn('Authentication failed');
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, name: user.name };
    return { token: await this.jwtService.signAsync(payload) };
  }

  private async isPasswordValid(
    password: string,
    passwordHash: string,
  ): Promise<boolean> {
    try {
      return await verifyPassword(password, passwordHash);
    } catch (error) {
      if (error instanceof UnsupportedPasswordHashError) {
        this.logger.warn(
          'Authentication failed due to unsupported password hash',
        );
        return false;
      }
      throw error;
    }
  }
}
