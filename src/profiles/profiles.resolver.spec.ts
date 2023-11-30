import { Test, TestingModule } from '@nestjs/testing';
import { ProfilesResolver } from './profiles.resolver';
import { ProfilesService } from './profiles.service';
import { PrismaService } from '../prisma/prisma.service';
import { Profile, User } from '@prisma/client';
import { CreateProfileInput } from './dto/create-profile.input';
import { UpdateProfileInput } from './dto/update-profile.input';
import { UsersService } from '../users/users.service';

describe('ProfilesResolver', () => {
  let profilesResolver: ProfilesResolver;
  let profilesService: ProfilesService;
  let usersService: UsersService;

  const profile: Profile = {
    id: 1,
    bio: 'Happy',
    userId: 1,
  };

  const profiles: Profile[] = [
    {
      id: 1,
      bio: 'Happy',
      userId: 1,
    },
  ];

  const user: User = {
    id: 1,
    createdAt: new Date(),
    email: 'andrew@prisma.io',
    name: 'Andrew',
    password: 'whoami',
    role: 'ADMIN',
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaService,
        ProfilesResolver,
        ProfilesService,
        UsersService,
      ],
    }).compile();

    profilesResolver = moduleRef.get<ProfilesResolver>(ProfilesResolver);
    profilesService = moduleRef.get<ProfilesService>(ProfilesService);
    usersService = moduleRef.get<UsersService>(UsersService);
  });

  describe('create', () => {
    it('should return a profile', async () => {
      const createProfileInput: CreateProfileInput = {
        bio: 'Happy',
        userId: 1,
      };
      jest
        .spyOn(profilesService, 'create')
        .mockImplementation(async () => profile);
      expect(await profilesResolver.createProfile(createProfileInput)).toBe(
        profile,
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of profiles', async () => {
      jest
        .spyOn(profilesService, 'findAll')
        .mockImplementation(async () => profiles);
      expect(await profilesResolver.findAll(0, 2)).toBe(profiles);
    });
  });

  describe('findOne', () => {
    it('should return a profile', async () => {
      jest
        .spyOn(profilesService, 'findOne')
        .mockImplementation(async () => profile);
      expect(await profilesResolver.findOne(1)).toBe(profile);
    });
  });

  describe('user', () => {
    it('should return a user by profile id', async () => {
      jest.spyOn(usersService, 'findOne').mockImplementation(async () => user);
      expect(await profilesResolver.user(profile)).toBe(user);
    });
  });

  describe('update', () => {
    it('should return an updated profile', async () => {
      const updateProfileInput: UpdateProfileInput = {
        bio: 'Soso',
      };
      jest
        .spyOn(profilesService, 'update')
        .mockImplementation(async () => profile);
      expect(await profilesResolver.updateProfile(1, updateProfileInput)).toBe(
        profile,
      );
    });
  });

  describe('remove', () => {
    it('should return a profile', async () => {
      jest
        .spyOn(profilesService, 'remove')
        .mockImplementation(async () => profile);
      expect(await profilesResolver.removeProfile(1)).toBe(profile);
    });
  });
});
