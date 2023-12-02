import { Test, TestingModule } from '@nestjs/testing';
import { LocationsService } from './locations.service';
import { PrismaService } from '../prisma/prisma.service';
import {
  location,
  locations,
  createLocationInput,
  updateLocationInput,
} from '../common/constants/jest.constants';

describe('LocationsService', () => {
  let locationsService: LocationsService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, LocationsService],
    }).compile();

    locationsService = moduleRef.get<LocationsService>(LocationsService);
  });

  describe('create', () => {
    it('should create a location', async () => {
      jest
        .spyOn(locationsService, 'create')
        .mockImplementation(async () => location);
      expect(await locationsService.create(createLocationInput)).toBe(location);
    });
  });

  describe('findAll', () => {
    it('should return an array of locations', async () => {
      jest
        .spyOn(locationsService, 'findAll')
        .mockImplementation(async () => locations);
      expect(await locationsService.findAll({ skip: 0, take: 10 })).toBe(
        locations,
      );
    });
  });

  describe('findOne', () => {
    it('should return a location by id', async () => {
      jest
        .spyOn(locationsService, 'findOne')
        .mockImplementation(async () => location);
      expect(await locationsService.findOne({ id: 1000 })).toBe(location);
    });
  });

  describe('update', () => {
    it('should update a location', async () => {
      jest
        .spyOn(locationsService, 'update')
        .mockImplementation(async () => location);
      expect(
        await locationsService.update({
          where: { id: 1100 },
          data: updateLocationInput,
        }),
      ).toBe(location);
    });
  });

  describe('remove', () => {
    it('should delete a location by id', async () => {
      jest
        .spyOn(locationsService, 'remove')
        .mockImplementation(async () => location);
      expect(await locationsService.remove({ id: 1000 })).toBe(location);
    });
  });
});
