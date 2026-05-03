import { forwardRef, Module } from '@nestjs/common';
import { RegionsService } from './regions.service';
import { RegionsResolver } from './regions.resolver';
import { CountriesModule } from '../countries/countries.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule, forwardRef(() => CountriesModule)],
  providers: [RegionsResolver, RegionsService],
  exports: [RegionsService],
})
export class RegionsModule {}
