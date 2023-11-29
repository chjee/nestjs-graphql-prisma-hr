import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Region } from './../../regions/entities/region.entity';

@ObjectType({ description: 'Country object' })
export class Country {
  @Field(() => String, { description: 'Country ID' })
  id: string;

  @Field(() => String, { nullable: true, description: 'Country name' })
  name: string;

  @Field(() => Int, { description: 'Region ID' })
  regionId: number;

  @Field(() => Region, { nullable: true, description: 'Region object' })
  region?: Region | null;
}
