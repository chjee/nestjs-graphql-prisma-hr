import { Module } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { DepartmentsResolver } from './departments.resolver';
import { EmployeesService } from '../employees/employees.service';
import { LocationsService } from '../locations/locations.service';
import { JobhistoriesService } from '../jobhistories/jobhistories.service';

@Module({
  providers: [
    DepartmentsResolver,
    DepartmentsService,
    EmployeesService,
    LocationsService,
    JobhistoriesService,
  ],
})
export class DepartmentsModule {}
