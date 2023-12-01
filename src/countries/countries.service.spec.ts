import { Test, TestingModule } from '@nestjs/testing';
import { CountriesService } from './countries.service';
import { PrismaService } from '../prisma/prisma.service';
import { country, countries } from '../common/constants/hr.constants';
import { CreateCountryInput } from './dto/create-country.input';
import { UpdateCountryInput } from './dto/update-country.input';

describe('CountriesService', () => {
  let countriesService: CountriesService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, CountriesService],
    }).compile();

    countriesService = moduleRef.get<CountriesService>(CountriesService);
  });

  describe('create', () => {
    it('should create a country', async () => {
      const createCountryInput: CreateCountryInput = {
        id: 'KR',
        name: 'Korea',
        regionId: 3,
      };
      jest
        .spyOn(countriesService, 'create')
        .mockImplementation(async () => country);
      expect(await countriesService.create(createCountryInput)).toBe(country);
    });
  });

  describe('findAll', () => {
    it('should return an array of countries', async () => {
      jest
        .spyOn(countriesService, 'findAll')
        .mockImplementation(async () => countries);
      expect(await countriesService.findAll({ skip: 0, take: 3 })).toBe(
        countries,
      );
    });
  });

  describe('findOne', () => {
    it('should return a country by id', async () => {
      jest
        .spyOn(countriesService, 'findOne')
        .mockImplementation(async () => country);
      expect(await countriesService.findOne({ id: 'KR' })).toBe(country);
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
        await countriesService.update({
          where: { id: 'KR' },
          data: updateCountryInput,
        }),
      ).toBe(country);
    });
  });

  describe('remove', () => {
    it('should remove a country by id', async () => {
      jest
        .spyOn(countriesService, 'remove')
        .mockImplementation(async () => country);
      expect(await countriesService.remove({ id: 'KR' })).toBe(country);
    });
  });
});
