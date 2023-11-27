import { Module } from '@nestjs/common';
import { RegionsService } from './regions.service';
import { RegionsResolver } from './regions.resolver';

@Module({
  providers: [RegionsResolver, RegionsService],
})
export class RegionsModule {}
