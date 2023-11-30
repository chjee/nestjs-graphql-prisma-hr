import { Test, TestingModule } from '@nestjs/testing';
import { ProfilesService } from './profiles.service';
import { PrismaService } from '../prisma/prisma.service';
import { Profile } from '@prisma/client';
import { CreateProfileInput } from './dto/create-profile.input';
import { UpdateProfileInput } from './dto/update-profile.input';

describe('ProfilesService', () => {
  let service: ProfilesService;

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

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, ProfilesService],
    }).compile();

    service = moduleRef.get<ProfilesService>(ProfilesService);
  });

  describe('create', () => {
    it('should return a profile', async () => {
      const createProfileInput: CreateProfileInput = {
        bio: 'Happy',
        userId: 1,
      };
      jest.spyOn(service, 'create').mockImplementation(async () => profile);
      expect(await service.create(createProfileInput)).toBe(profile);
    });
  });

  describe('findAll', () => {
    it('should return an array of profiles', async () => {
      jest.spyOn(service, 'findAll').mockImplementation(async () => profiles);
      expect(await service.findAll({ skip: 0, take: 3 })).toBe(profiles);
    });
  });

  describe('findOne', () => {
    it('should return a profile', async () => {
      jest.spyOn(service, 'findOne').mockImplementation(async () => profile);
      expect(await service.findOne({ id: 1 })).toBe(profile);
    });
  });

  describe('update', () => {
    it('should return an updated profile', async () => {
      const updateProfileInput: UpdateProfileInput = {
        bio: 'Soso',
      };
      jest.spyOn(service, 'update').mockImplementation(async () => profile);
      expect(
        await service.update({ where: { id: 1 }, data: updateProfileInput }),
      ).toBe(profile);
    });
  });

  describe('remove', () => {
    it('should return a profile', async () => {
      jest.spyOn(service, 'remove').mockImplementation(async () => profile);
      expect(await service.remove({ id: 1 })).toBe(profile);
    });
  });
});
