import { forwardRef, Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesResolver } from './employees.resolver';
import { DepartmentsModule } from '../departments/departments.module';
import { JobhistoriesModule } from '../jobhistories/jobhistories.module';
import { JobsModule } from '../jobs/jobs.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    forwardRef(() => DepartmentsModule),
    forwardRef(() => JobsModule),
    forwardRef(() => JobhistoriesModule),
  ],
  providers: [EmployeesResolver, EmployeesService],
  exports: [EmployeesService],
})
export class EmployeesModule {}
