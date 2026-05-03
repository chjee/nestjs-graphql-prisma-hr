import { forwardRef, Module } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { DepartmentsResolver } from './departments.resolver';
import { EmployeesModule } from '../employees/employees.module';
import { JobhistoriesModule } from '../jobhistories/jobhistories.module';
import { LocationsModule } from '../locations/locations.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    forwardRef(() => EmployeesModule),
    forwardRef(() => LocationsModule),
    forwardRef(() => JobhistoriesModule),
  ],
  providers: [DepartmentsResolver, DepartmentsService],
  exports: [DepartmentsService],
})
export class DepartmentsModule {}
