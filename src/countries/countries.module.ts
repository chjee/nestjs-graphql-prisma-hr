import { forwardRef, Module } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { CountriesResolver } from './countries.resolver';
import { LocationsModule } from '../locations/locations.module';
import { RegionsModule } from '../regions/regions.module';

@Module({
  imports: [forwardRef(() => RegionsModule), forwardRef(() => LocationsModule)],
  providers: [CountriesResolver, CountriesService],
  exports: [CountriesService],
})
export class CountriesModule {}
