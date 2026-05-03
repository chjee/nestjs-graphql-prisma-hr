import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';
import {
  user,
  users,
  createUserInput,
} from '../common/constants/jest.constants';
import { verifyPassword } from '../common/utils/password.util';

const prismaMock = {
  user: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

describe('UsersService', () => {
  let usersService: UsersService;

  beforeEach(async () => {
    jest.clearAllMocks();
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    usersService = moduleRef.get<UsersService>(UsersService);
  });

  describe('create', () => {
    it('hashes the password before creating a user', async () => {
      prismaMock.user.create.mockImplementation(async ({ data }) => ({
        ...user,
        ...data,
      }));

      const createdUser = await usersService.create(createUserInput);
      const prismaData = prismaMock.user.create.mock.calls[0][0].data;

      expect(createdUser.password).not.toBe(createUserInput.password);
      expect(prismaData.password).not.toBe(createUserInput.password);
      expect(prismaData.password.length).toBeLessThanOrEqual(60);
      await expect(
        verifyPassword(createUserInput.password, prismaData.password),
      ).resolves.toBe(true);
    });
  });

  describe('findAll', () => {
    it('delegates to Prisma findMany', async () => {
      prismaMock.user.findMany.mockResolvedValue(users);
      await expect(usersService.findAll({ skip: 0, take: 3 })).resolves.toBe(
        users,
      );
      expect(prismaMock.user.findMany).toHaveBeenCalledWith({
        skip: 0,
        take: 3,
        cursor: undefined,
        where: undefined,
        orderBy: { id: 'asc' },
      });
    });
  });

  describe('findOne', () => {
    it('delegates to Prisma findUnique', async () => {
      prismaMock.user.findUnique.mockResolvedValue(user);
      await expect(usersService.findOne({ id: 1 })).resolves.toBe(user);
      expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });
  });

  describe('update', () => {
    it('hashes string password updates before delegating to Prisma', async () => {
      prismaMock.user.update.mockImplementation(async ({ data }) => ({
        ...user,
        ...data,
      }));

      await usersService.update({
        where: { id: 1 },
        data: { password: 'newpass' },
      });
      const prismaData = prismaMock.user.update.mock.calls[0][0].data;

      expect(prismaData.password).not.toBe('newpass');
      await expect(
        verifyPassword('newpass', prismaData.password),
      ).resolves.toBe(true);
    });
  });

  describe('remove', () => {
    it('delegates to Prisma delete', async () => {
      prismaMock.user.delete.mockResolvedValue(user);
      await expect(usersService.remove({ id: 1 })).resolves.toBe(user);
      expect(prismaMock.user.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  });
});
