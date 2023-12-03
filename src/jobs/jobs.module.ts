import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobsResolver } from './jobs.resolver';
import { EmployeesService } from '../employees/employees.service';
import { JobhistoriesService } from 'src/jobhistories/jobhistories.service';

@Module({
  providers: [JobsResolver, JobsService, EmployeesService, JobhistoriesService],
})
export class JobsModule {}
