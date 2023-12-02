import { Test, TestingModule } from '@nestjs/testing';
import { RegionsResolver } from './regions.resolver';
import { RegionsService } from './regions.service';
import { PrismaService } from '../prisma/prisma.service';
import { CountriesService } from '../countries/countries.service';
import {
  region,
  regions,
  createRegionInput,
  updateRegionInput,
  countries,
} from '../common/constants/jest.constants';

describe('RegionsResolver', () => {
  let regionsResolver: RegionsResolver;
  let regionsService: RegionsService;
  let countriesService: CountriesService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaService,
        RegionsResolver,
        RegionsService,
        CountriesService,
      ],
    }).compile();

    regionsResolver = moduleRef.get<RegionsResolver>(RegionsResolver);
    regionsService = moduleRef.get<RegionsService>(RegionsService);
    countriesService = moduleRef.get<CountriesService>(CountriesService);
  });

  describe('create', () => {
    it('should create a region', async () => {
      jest
        .spyOn(regionsService, 'create')
        .mockImplementation(async () => region);
      expect(await regionsResolver.createRegion(createRegionInput)).toBe(
        region,
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of regions', async () => {
      jest
        .spyOn(regionsService, 'findAll')
        .mockImplementation(async () => regions);
      expect(await regionsResolver.findAll(0, 10)).toBe(regions);
    });
  });

  describe('findOne', () => {
    it('should return a region by id', async () => {
      jest
        .spyOn(regionsService, 'findOne')
        .mockImplementation(async () => region);
      expect(await regionsResolver.findOne(5)).toBe(region);
    });
  });

  describe('countries', () => {
    it('should return an array of countries by region id', async () => {
      jest
        .spyOn(countriesService, 'findAll')
        .mockImplementation(async () => countries);
      expect(await regionsResolver.countries(region)).toBe(countries);
    });
  });

  describe('update', () => {
    it('should update a region by id', async () => {
      jest
        .spyOn(regionsService, 'update')
        .mockImplementation(async () => region);
      expect(await regionsResolver.updateRegion(5, updateRegionInput)).toBe(
        region,
      );
    });
  });

  describe('remove', () => {
    it('should remove a region by id', async () => {
      jest
        .spyOn(regionsService, 'remove')
        .mockImplementation(async () => region);
      expect(await regionsResolver.removeRegion(5)).toBe(region);
    });
  });
});
