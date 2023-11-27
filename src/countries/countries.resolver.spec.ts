import { Test, TestingModule } from '@nestjs/testing';
import { CountriesResolver } from './countries.resolver';
import { CountriesService } from './countries.service';

describe('CountriesResolver', () => {
  let resolver: CountriesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CountriesResolver, CountriesService],
    }).compile();

    resolver = module.get<CountriesResolver>(CountriesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
