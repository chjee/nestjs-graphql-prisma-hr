import { Module } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { CountriesResolver } from './countries.resolver';
import { RegionsService } from '../regions/regions.service';
import { LocationsService } from '../locations/locations.service';

@Module({
  providers: [
    CountriesResolver,
    CountriesService,
    RegionsService,
    LocationsService,
  ],
})
export class CountriesModule {}
