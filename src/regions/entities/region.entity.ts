import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Country } from './../../countries/entities/country.entity';

@ObjectType({ description: 'Region object' })
export class Region {
  @Field(() => Int, { description: 'Region ID)' })
  id: number;

  @Field(() => String, { description: 'Region name' })
  name: string;

  @Field(() => [Country], { nullable: true, description: 'Country name' })
  countries?: Country[] | null;
}
