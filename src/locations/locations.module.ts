import { Module } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { LocationsResolver } from './locations.resolver';
import { CountriesService } from '../countries/countries.service';
import { DepartmentsService } from '../departments/departments.service';

@Module({
  providers: [
    LocationsResolver,
    LocationsService,
    CountriesService,
    DepartmentsService,
  ],
})
export class LocationsModule {}
