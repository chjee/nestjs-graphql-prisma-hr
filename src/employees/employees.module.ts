import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesResolver } from './employees.resolver';
import { DepartmentsService } from '../departments/departments.service';
import { JobsService } from '../jobs/jobs.service';
import { JobhistoriesService } from '../jobhistories/jobhistories.service';

@Module({
  providers: [
    EmployeesResolver,
    EmployeesService,
    DepartmentsService,
    JobsService,
    JobhistoriesService,
  ],
})
export class EmployeesModule {}
