import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

@InputType({ description: 'Create location input' })
export class CreateLocationInput {
  @Field(() => String, { nullable: true, description: 'Street address' })
  @IsOptional()
  @IsString()
  @Length(3, 40)
  streetAddress?: string | null;

  @Field(() => String, { nullable: true, description: 'Postal code' })
  @IsOptional()
  @IsString()
  @Length(3, 12)
  postalCode?: string | null;

  @Field(() => String, { description: 'City' })
  @IsNotEmpty()
  @IsString()
  @Length(3, 30)
  city: string;

  @Field(() => String, { nullable: true, description: 'State province' })
  @IsOptional()
  @IsString()
  @Length(3, 25)
  stateProvince?: string | null;

  @Field(() => String, { description: 'Country ID' })
  @IsNotEmpty()
  @IsString()
  @Length(2, 2)
  countryId: string;
}
