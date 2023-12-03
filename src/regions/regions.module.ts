import { Module } from '@nestjs/common';
import { RegionsService } from './regions.service';
import { RegionsResolver } from './regions.resolver';
import { CountriesService } from '../countries/countries.service';

@Module({
  providers: [RegionsResolver, RegionsService, CountriesService],
})
export class RegionsModule {}
