import { Test, TestingModule } from '@nestjs/testing';
import { RegionsResolver } from './regions.resolver';
import { RegionsService } from './regions.service';

describe('RegionsResolver', () => {
  let resolver: RegionsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RegionsResolver, RegionsService],
    }).compile();

    resolver = module.get<RegionsResolver>(RegionsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
