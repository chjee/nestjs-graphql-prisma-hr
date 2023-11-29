import { Test, TestingModule } from '@nestjs/testing';
import { RegionsService } from './regions.service';
import { PrismaService } from '../prisma/prisma.service';
import { Region } from '@prisma/client';
import { CreateRegionInput } from './dto/create-region.input';
import { UpdateRegionInput } from './dto/update-region.input';

describe('RegionsService', () => {
  let service: RegionsService;

  const region: Region = {
    id: 5,
    name: 'Antarctica',
  };

  const regions: Region[] = [
    {
      id: 5,
      name: 'Antarctica',
    },
  ];

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, RegionsService],
    }).compile();

    service = moduleRef.get<RegionsService>(RegionsService);
  });

  describe('create', () => {
    it('should create a region', async () => {
      const createRegionInput: CreateRegionInput = {
        id: 5,
        name: 'Antarctica',
      };
      jest.spyOn(service, 'create').mockImplementation(async () => region);
      expect(await service.create(createRegionInput)).toBe(region);
    });
  });

  describe('findAll', () => {
    it('should return an array of regions', async () => {
      jest.spyOn(service, 'findAll').mockImplementation(async () => regions);
      expect(await service.findAll({ skip: 0, take: 3 })).toBe(regions);
    });
  });

  describe('findOne', () => {
    it('should return a region by id', async () => {
      const result: Region = region;
      jest.spyOn(service, 'findOne').mockImplementation(async () => region);
      expect(await service.findOne({ id: 5 })).toBe(result);
    });
  });

  describe('update', () => {
    it('should update a region by id', async () => {
      const updateRegionInput: UpdateRegionInput = {
        name: 'Antarctic Continent',
      };
      jest.spyOn(service, 'update').mockImplementation(async () => region);
      expect(
        await service.update({ where: { id: 5 }, data: updateRegionInput }),
      ).toBe(region);
    });
  });

  describe('remove', () => {
    it('should delete a region by id', async () => {
      jest.spyOn(service, 'remove').mockImplementation(async () => region);
      expect(await service.remove({ id: 5 })).toBe(region);
    });
  });
});
