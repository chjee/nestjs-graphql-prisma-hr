import { Module } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { DepartmentsResolver } from './departments.resolver';
import { EmployeesService } from '../employees/employees.service';
import { LocationsService } from '../locations/locations.service';

@Module({
  providers: [
    DepartmentsResolver,
    DepartmentsService,
    EmployeesService,
    LocationsService,
  ],
})
export class DepartmentsModule {}
