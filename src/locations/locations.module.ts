import { forwardRef, Module } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { LocationsResolver } from './locations.resolver';
import { CountriesModule } from '../countries/countries.module';
import { DepartmentsModule } from '../departments/departments.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    forwardRef(() => CountriesModule),
    forwardRef(() => DepartmentsModule),
  ],
  providers: [LocationsResolver, LocationsService],
  exports: [LocationsService],
})
export class LocationsModule {}
