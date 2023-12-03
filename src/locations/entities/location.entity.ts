import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Country } from './../../countries/entities/country.entity';
import { Department } from './../../departments/entities/department.entity';

@ObjectType({ description: 'Location object' })
export class Location {
  @Field(() => Int, { description: 'Location ID' })
  id: number;

  @Field(() => String, { nullable: true, description: 'Street address' })
  streetAddress?: string;

  @Field(() => String, { nullable: true, description: 'Postal code' })
  postalCode?: string;

  @Field(() => String, { description: 'City' })
  city: string;

  @Field(() => String, { nullable: true, description: 'State province' })
  stateProvince?: string;

  @Field(() => String, { description: 'Country ID' })
  countryId: string;

  @Field(() => Country, { nullable: true, description: 'Country object' })
  country?: Country;

  @Field(() => [Department], {
    nullable: true,
    description: 'Department object',
  })
  departments?: Department[];
}
