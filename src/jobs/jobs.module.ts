import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobsResolver } from './jobs.resolver';
import { EmployeesService } from '../employees/employees.service';

@Module({
  providers: [JobsResolver, JobsService, EmployeesService],
})
export class JobsModule {}
