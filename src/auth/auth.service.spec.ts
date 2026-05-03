import { UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { hashPassword } from '../common/utils/password.util';

describe('AuthService', () => {
  const jwtService = {
    signAsync: jest.fn(),
  };
  const usersService = {
    findUser: jest.fn(),
  };
  let authService: AuthService;

  beforeEach(() => {
    jest.clearAllMocks();
    authService = new AuthService(usersService as any, jwtService as any);
  });

  it('returns a token for valid hashed credentials', async () => {
    const password = 'whoami';
    usersService.findUser.mockResolvedValue({
      id: 1,
      name: 'Alice',
      email: 'alice@prisma.io',
      password: await hashPassword(password),
    });
    jwtService.signAsync.mockResolvedValue('signed-token');

    await expect(
      authService.signIn({ email: 'alice@prisma.io', password }),
    ).resolves.toEqual({ token: 'signed-token' });
    expect(jwtService.signAsync).toHaveBeenCalledWith({
      sub: 1,
      name: 'Alice',
    });
  });

  it('rejects missing users', async () => {
    usersService.findUser.mockResolvedValue(null);

    await expect(
      authService.signIn({ email: 'missing@prisma.io', password: 'whoami' }),
    ).rejects.toBeInstanceOf(UnauthorizedException);
    expect(jwtService.signAsync).not.toHaveBeenCalled();
  });

  it('rejects legacy plaintext password rows with UnauthorizedException', async () => {
    usersService.findUser.mockResolvedValue({
      id: 1,
      name: 'Alice',
      email: 'alice@prisma.io',
      password: 'whoami',
    });

    await expect(
      authService.signIn({ email: 'alice@prisma.io', password: 'whoami' }),
    ).rejects.toBeInstanceOf(UnauthorizedException);
    expect(jwtService.signAsync).not.toHaveBeenCalled();
  });

  it('rejects invalid passwords', async () => {
    usersService.findUser.mockResolvedValue({
      id: 1,
      name: 'Alice',
      email: 'alice@prisma.io',
      password: await hashPassword('whoami'),
    });

    await expect(
      authService.signIn({ email: 'alice@prisma.io', password: 'badpass' }),
    ).rejects.toBeInstanceOf(UnauthorizedException);
    expect(jwtService.signAsync).not.toHaveBeenCalled();
  });
});
