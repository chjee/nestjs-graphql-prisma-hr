import { Module } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { LocationsResolver } from './locations.resolver';
import { CountriesService } from '../countries/countries.service';

@Module({
  providers: [LocationsResolver, LocationsService, CountriesService],
})
export class LocationsModule {}
