import { Module } from '@nestjs/common';
import { JobhistoriesService } from './jobhistories.service';
import { JobhistoriesResolver } from './jobhistories.resolver';
import { JobsService } from '../jobs/jobs.service';
import { DepartmentsService } from '../departments/departments.service';
import { EmployeesService } from '../employees/employees.service';

@Module({
  providers: [
    JobhistoriesResolver,
    JobhistoriesService,
    JobsService,
    EmployeesService,
    DepartmentsService,
  ],
})
export class JobhistoriesModule {}
