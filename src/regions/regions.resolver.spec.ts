import { Test, TestingModule } from '@nestjs/testing';
import { RegionsResolver } from './regions.resolver';
import { RegionsService } from './regions.service';
import { Region } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRegionInput } from './dto/create-region.input';
import { UpdateRegionInput } from './dto/update-region.input';
import { CountriesService } from '../countries/countries.service';

describe('RegionsResolver', () => {
  let resolver: RegionsResolver;
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
      providers: [
        PrismaService,
        RegionsResolver,
        RegionsService,
        CountriesService,
      ],
    }).compile();

    resolver = moduleRef.get<RegionsResolver>(RegionsResolver);
    service = moduleRef.get<RegionsService>(RegionsService);
  });

  describe('create', () => {
    it('should create a region', async () => {
      const createRegionInput: CreateRegionInput = {
        id: 5,
        name: 'Antarctica',
      };
      jest.spyOn(service, 'create').mockImplementation(async () => region);
      expect(await resolver.createRegion(createRegionInput)).toBe(region);
    });
  });

  describe('findAll', () => {
    it('should return an array of regions', async () => {
      jest.spyOn(service, 'findAll').mockImplementation(async () => regions);
      expect(await resolver.findAll(0, 10)).toBe(regions);
    });
  });

  describe('findOne', () => {
    it('should return a region by id', async () => {
      jest.spyOn(service, 'findOne').mockImplementation(async () => region);
      expect(await resolver.findOne(5)).toBe(region);
    });
  });

  describe('update', () => {
    it('should update a region by id', async () => {
      const updateRegionInput: UpdateRegionInput = {
        name: 'Antarctic Continent',
      };
      jest.spyOn(service, 'update').mockImplementation(async () => region);
      expect(await resolver.updateRegion(5, updateRegionInput)).toBe(region);
    });
  });

  describe('remove', () => {
    it('should remove a region by id', async () => {
      jest.spyOn(service, 'remove').mockImplementation(async () => region);
      expect(await resolver.removeRegion(5)).toBe(region);
    });
  });
});
