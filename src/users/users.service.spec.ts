import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';
import {
  user,
  users,
  createUserInput,
  updateUserInput,
} from '../common/constants/jest.constants';

describe('UsersService', () => {
  let usersService: UsersService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, UsersService],
    }).compile();

    usersService = moduleRef.get<UsersService>(UsersService);
  });

  describe('create', () => {
    it('should return a user', async () => {
      jest.spyOn(usersService, 'create').mockImplementation(async () => user);
      expect(await usersService.create(createUserInput)).toBe(user);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      jest.spyOn(usersService, 'findAll').mockImplementation(async () => users);
      expect(await usersService.findAll({ skip: 0, take: 3 })).toBe(users);
    });
  });

  describe('findOne', () => {
    it('should return a user', async () => {
      jest.spyOn(usersService, 'findOne').mockImplementation(async () => user);
      expect(await usersService.findOne({ id: 1 })).toBe(user);
    });
  });

  describe('update', () => {
    it('should return a user', async () => {
      jest.spyOn(usersService, 'update').mockImplementation(async () => user);
      expect(
        await usersService.update({ where: { id: 1 }, data: updateUserInput }),
      ).toBe(user);
    });
  });

  describe('remove', () => {
    it('should return a user', async () => {
      jest.spyOn(usersService, 'remove').mockImplementation(async () => user);
      expect(await usersService.remove({ id: 1 })).toBe(user);
    });
  });
});
