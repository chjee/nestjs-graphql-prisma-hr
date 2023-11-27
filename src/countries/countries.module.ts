import { Module } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { CountriesResolver } from './countries.resolver';
import { RegionsService } from 'src/regions/regions.service';

@Module({
  providers: [CountriesResolver, CountriesService, RegionsService],
})
export class CountriesModule {}
