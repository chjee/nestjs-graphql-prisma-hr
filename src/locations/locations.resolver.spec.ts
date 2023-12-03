import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { LocationsResolver } from './locations.resolver';
import { LocationsService } from './locations.service';
import { CountriesService } from '../countries/countries.service';
import { DepartmentsService } from '../departments/departments.service';

import {
  location,
  locations,
  createLocationInput,
  updateLocationInput,
  country,
  departments,
} from '../common/constants/jest.constants';

describe('LocationsResolver', () => {
  let locationsResolver: LocationsResolver;
  let locationsService: LocationsService;
  let countriesService: CountriesService;
  let departmentsService: DepartmentsService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaService,
        LocationsResolver,
        LocationsService,
        CountriesService,
        DepartmentsService,
      ],
    }).compile();

    locationsResolver = moduleRef.get<LocationsResolver>(LocationsResolver);
    locationsService = moduleRef.get<LocationsService>(LocationsService);
    countriesService = moduleRef.get<CountriesService>(CountriesService);
    departmentsService = moduleRef.get<DepartmentsService>(DepartmentsService);
  });

  describe('create', () => {
    it('should create a location', async () => {
      jest
        .spyOn(locationsService, 'create')
        .mockImplementation(async () => location);
      expect(await locationsResolver.createLocation(createLocationInput)).toBe(
        location,
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of locations', async () => {
      jest
        .spyOn(locationsService, 'findAll')
        .mockImplementation(async () => locations);
      expect(await locationsResolver.findAll(0, 10)).toBe(locations);
    });
  });

  describe('findOne', () => {
    it('should return a location by id', async () => {
      jest
        .spyOn(locationsService, 'findOne')
        .mockImplementation(async () => location);
      expect(await locationsResolver.findOne(1100)).toBe(location);
    });
  });

  describe('country', () => {
    it('should return a country by location id', async () => {
      jest
        .spyOn(countriesService, 'findOne')
        .mockImplementation(async () => country);
      expect(await locationsResolver.country(location)).toBe(country);
    });
  });

  describe('departments', () => {
    it('should return an array of departments by location id', async () => {
      jest
        .spyOn(departmentsService, 'findAll')
        .mockImplementation(async () => departments);
      expect(await locationsResolver.departments(location)).toBe(departments);
    });
  });

  describe('update', () => {
    it('should update a location by id', async () => {
      jest
        .spyOn(locationsService, 'update')
        .mockImplementation(async () => location);
      expect(
        await locationsResolver.updateLocation(1100, updateLocationInput),
      ).toBe(location);
    });
  });

  describe('remove', () => {
    it('should delete a location by id', async () => {
      jest
        .spyOn(locationsService, 'remove')
        .mockImplementation(async () => location);
      expect(await locationsResolver.removeLocation(1100)).toBe(location);
    });
  });
});
