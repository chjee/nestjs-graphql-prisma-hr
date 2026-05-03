import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Country } from './../../countries/entities/country.entity';

@ObjectType({ description: 'Region object' })
export class Region {
  @Field(() => Int, { description: 'Region ID)' })
  id: number;

  @Field(() => String, { nullable: true, description: 'Region name' })
  name?: string | null;

  @Field(() => [Country], { nullable: true, description: 'Country name' })
  countries?: Country[];
}
