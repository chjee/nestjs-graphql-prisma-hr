import { Test, TestingModule } from '@nestjs/testing';
import { CountriesResolver } from './countries.resolver';
import { CountriesService } from './countries.service';
import { PrismaService } from '../prisma/prisma.service';
import { RegionsService } from '../regions/regions.service';
import { Country } from './entities/country.entity';
import { Region } from '../regions/entities/region.entity';
import { CreateCountryInput } from './dto/create-country.input';
import { UpdateCountryInput } from './dto/update-country.input';

describe('CountriesResolver', () => {
  let countriesResolver: CountriesResolver;
  let countriesService: CountriesService;
  let regionsService: RegionsService;

  const country: Country = {
    id: 'KR',
    name: 'Republic of Korea',
    regionId: 3,
  };

  const countries: Country[] = [
    {
      id: 'KR',
      name: 'Republic of Korea',
      regionId: 3,
    },
  ];

  const region: Region = {
    id: 5,
    name: 'Antarctica',
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaService,
        CountriesResolver,
        CountriesService,
        RegionsService,
      ],
    }).compile();

    countriesResolver = moduleRef.get<CountriesResolver>(CountriesResolver);
    countriesService = moduleRef.get<CountriesService>(CountriesService);
    regionsService = moduleRef.get<RegionsService>(RegionsService);
  });

  describe('create', () => {
    it('should create a country', async () => {
      const createCountryInput: CreateCountryInput = {
        id: 'KR',
        name: 'Republic of Korea',
        regionId: 3,
      };
      jest
        .spyOn(countriesService, 'create')
        .mockImplementation(async () => country);
      expect(await countriesResolver.createCountry(createCountryInput)).toBe(
        country,
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of countries', async () => {
      jest
        .spyOn(countriesService, 'findAll')
        .mockImplementation(async () => countries);
      expect(await countriesResolver.findAll(0, 10)).toBe(countries);
    });
  });

  describe('findOne', () => {
    it('should return a country by id', async () => {
      jest
        .spyOn(countriesService, 'findOne')
        .mockImplementation(async () => country);
      expect(await countriesResolver.findOne('KR')).toBe(country);
    });
  });

  describe('update', () => {
    it('should update a country by id', async () => {
      const updateCountryInput: UpdateCountryInput = {
        name: 'Republic of Korea',
        regionId: 3,
      };
      jest
        .spyOn(countriesService, 'update')
        .mockImplementation(async () => country);
      expect(
        await countriesResolver.updateCountry('KR', updateCountryInput),
      ).toBe(country);
    });
  });

  describe('region', () => {
    it('should return a region by id', async () => {
      jest
        .spyOn(regionsService, 'findOne')
        .mockImplementation(async () => region);
      expect(await countriesResolver.region(country)).toBe(region);
    });
  });

  describe('delete', () => {
    it('should delete a country by id', async () => {
      jest
        .spyOn(countriesService, 'remove')
        .mockImplementation(async () => country);
      expect(await countriesResolver.removeCountry('KR')).toBe(country);
    });
  });
});
