import { forwardRef, Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobsResolver } from './jobs.resolver';
import { EmployeesModule } from '../employees/employees.module';
import { JobhistoriesModule } from '../jobhistories/jobhistories.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    forwardRef(() => EmployeesModule),
    forwardRef(() => JobhistoriesModule),
  ],
  providers: [JobsResolver, JobsService],
  exports: [JobsService],
})
export class JobsModule {}
