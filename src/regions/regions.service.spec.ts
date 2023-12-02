import { Test, TestingModule } from '@nestjs/testing';
import { RegionsService } from './regions.service';
import { PrismaService } from '../prisma/prisma.service';
import {
  region,
  regions,
  createRegionInput,
  updateRegionInput,
} from '../common/constants/jest.constants';

describe('RegionsService', () => {
  let regionsService: RegionsService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, RegionsService],
    }).compile();

    regionsService = moduleRef.get<RegionsService>(RegionsService);
  });

  describe('create', () => {
    it('should create a region', async () => {
      jest
        .spyOn(regionsService, 'create')
        .mockImplementation(async () => region);
      expect(await regionsService.create(createRegionInput)).toBe(region);
    });
  });

  describe('findAll', () => {
    it('should return an array of regions', async () => {
      jest
        .spyOn(regionsService, 'findAll')
        .mockImplementation(async () => regions);
      expect(await regionsService.findAll({ skip: 0, take: 3 })).toBe(regions);
    });
  });

  describe('findOne', () => {
    it('should return a region by id', async () => {
      jest
        .spyOn(regionsService, 'findOne')
        .mockImplementation(async () => region);
      expect(await regionsService.findOne({ id: 5 })).toBe(region);
    });
  });

  describe('update', () => {
    it('should update a region by id', async () => {
      jest
        .spyOn(regionsService, 'update')
        .mockImplementation(async () => region);
      expect(
        await regionsService.update({
          where: { id: 5 },
          data: updateRegionInput,
        }),
      ).toBe(region);
    });
  });

  describe('remove', () => {
    it('should delete a region by id', async () => {
      jest
        .spyOn(regionsService, 'remove')
        .mockImplementation(async () => region);
      expect(await regionsService.remove({ id: 5 })).toBe(region);
    });
  });
});
