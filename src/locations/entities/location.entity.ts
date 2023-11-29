import { ObjectType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString, Length, Min } from 'class-validator';
import { Country } from './../../countries/entities/country.entity';

@ObjectType({ description: 'Location object' })
export class Location {
  @Field(() => Int, { description: 'Location ID' })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  id: number;

  @Field(() => String, { nullable: true, description: 'Street address' })
  @IsString()
  @Length(3, 40)
  streetAddress?: string;

  @Field(() => String, { nullable: true, description: 'Postal code' })
  @IsString()
  @Length(3, 12)
  postalCode?: string;

  @Field(() => String, { nullable: true, description: 'City' })
  @IsString()
  @Length(3, 30)
  city?: string;

  @Field(() => String, { nullable: true, description: 'State province' })
  @IsString()
  @Length(3, 25)
  stateProvince?: string;

  @Field(() => String, { description: 'Country ID' })
  @IsString()
  @Length(2, 2)
  countryId: string;

  @Field(() => Country, { description: 'Country object' })
  country?: Country;

  // @Field(() => [Department], { description: 'Department object' })
  // departments?: Department[] | null;
}
