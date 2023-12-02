import { Test, TestingModule } from '@nestjs/testing';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';
import { ProfilesService } from '../profiles/profiles.service';
import {
  user,
  users,
  createUserInput,
  updateUserInput,
  profile,
} from '../common/constants/jest.constants';

describe('UsersResolver', () => {
  let usersResolver: UsersResolver;
  let usersService: UsersService;
  let profilesService: ProfilesService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, UsersResolver, UsersService, ProfilesService],
    }).compile();

    usersResolver = moduleRef.get<UsersResolver>(UsersResolver);
    usersService = moduleRef.get<UsersService>(UsersService);
    profilesService = moduleRef.get<ProfilesService>(ProfilesService);
  });

  describe('create', () => {
    it('should return a user', async () => {
      jest.spyOn(usersService, 'create').mockImplementation(async () => user);
      expect(await usersResolver.createUser(createUserInput)).toBe(user);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      jest.spyOn(usersService, 'findAll').mockImplementation(async () => users);
      expect(await usersResolver.findAll(0, 2)).toBe(users);
    });
  });

  describe('findOne', () => {
    it('should return a user', async () => {
      jest.spyOn(usersService, 'findOne').mockImplementation(async () => user);
      expect(await usersResolver.findOne(1)).toBe(user);
    });
  });

  describe('profile', () => {
    it('should return a profile', async () => {
      jest
        .spyOn(profilesService, 'findOne')
        .mockImplementation(async () => profile);
      expect(await usersResolver.profile(user)).toBe(profile);
    });
  });

  describe('update', () => {
    it('should return a user', async () => {
      jest.spyOn(usersService, 'update').mockImplementation(async () => user);
      expect(await usersResolver.updateUser(1, updateUserInput)).toBe(user);
    });
  });

  describe('remove', () => {
    it('should return a user', async () => {
      jest.spyOn(usersService, 'remove').mockImplementation(async () => user);
      expect(await usersResolver.removeUser(1)).toBe(user);
    });
  });
});
