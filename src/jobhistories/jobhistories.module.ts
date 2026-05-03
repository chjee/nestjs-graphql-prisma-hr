import { forwardRef, Module } from '@nestjs/common';
import { JobhistoriesService } from './jobhistories.service';
import { JobhistoriesResolver } from './jobhistories.resolver';
import { DepartmentsModule } from '../departments/departments.module';
import { EmployeesModule } from '../employees/employees.module';
import { JobsModule } from '../jobs/jobs.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    forwardRef(() => JobsModule),
    forwardRef(() => EmployeesModule),
    forwardRef(() => DepartmentsModule),
  ],
  providers: [JobhistoriesResolver, JobhistoriesService],
  exports: [JobhistoriesService],
})
export class JobhistoriesModule {}
