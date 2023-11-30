import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { LocationsResolver } from './locations.resolver';
import { LocationsService } from './locations.service';
import { CountriesService } from '../countries/countries.service';
// import { Location } from './entities/location.entity';
import { Location } from '@prisma/client';
import { Country } from '../countries/entities/country.entity';
import { CreateLocationInput } from './dto/create-location.input';
import { UpdateLocationInput } from './dto/update-location.input';

describe('LocationsResolver', () => {
  let locationsResolver: LocationsResolver;
  let locationsService: LocationsService;
  let countriesService: CountriesService;

  const location: Location = {
    id: 1100,
    streetAddress: '93091 Calle della Testa',
    postalCode: '10934',
    city: 'Venice',
    stateProvince: 'Venice',
    countryId: 'IT',
  };

  const locations: Location[] = [
    {
      id: 1100,
      streetAddress: '93091 Calle della Testa',
      postalCode: '10934',
      city: 'Venice',
      stateProvince: 'Venice',
      countryId: 'IT',
    },
  ];

  const country: Country = {
    id: 'KR',
    name: 'Republic of Korea',
    regionId: 3,
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaService,
        LocationsResolver,
        LocationsService,
        CountriesService,
      ],
    }).compile();

    locationsResolver = moduleRef.get<LocationsResolver>(LocationsResolver);
    locationsService = moduleRef.get<LocationsService>(LocationsService);
    countriesService = moduleRef.get<CountriesService>(CountriesService);
  });

  describe('create', () => {
    it('should create a location', async () => {
      const createLocationInput: CreateLocationInput = {
        streetAddress: '93091 Calle della Testa',
        postalCode: '10934',
        city: 'Venice',
        stateProvince: 'Venice',
        countryId: 'IT',
      };
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

  describe('update', () => {
    it('should update a location by id', async () => {
      const updateLocationInput: UpdateLocationInput = {
        streetAddress: '93091 Calle della Testa',
        postalCode: '10934',
        city: 'Venice',
        stateProvince: 'Venice',
        countryId: 'IT',
      };
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
