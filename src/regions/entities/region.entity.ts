import { ObjectType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, Length, Min } from 'class-validator';
import { Country } from './../../countries/entities/country.entity';

@ObjectType({ description: 'Region object' })
export class Region {
  @Field(() => Int, { description: 'Region ID)' })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  id: number;

  @Field(() => String, { description: 'Region name' })
  @IsNotEmpty()
  @Length(3, 25)
  name: string;

  @Field(() => [Country], { description: 'Country name' })
  countries?: Country[] | null;
}
