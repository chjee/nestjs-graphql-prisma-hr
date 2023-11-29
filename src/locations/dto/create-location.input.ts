import { InputType, Field } from '@nestjs/graphql';
import { IsString, Length } from 'class-validator';

@InputType({ description: 'Create location input' })
export class CreateLocationInput {
  @Field(() => String, { nullable: true, description: 'Street address' })
  @IsString()
  @Length(3, 40)
  streetAddress: string;

  @Field(() => String, { nullable: true, description: 'Postal code' })
  @IsString()
  @Length(3, 12)
  postalCode: string;

  @Field(() => String, { nullable: true, description: 'City' })
  @IsString()
  @Length(3, 30)
  city: string;

  @Field(() => String, { nullable: true, description: 'State province' })
  @IsString()
  @Length(3, 25)
  stateProvince: string;

  @Field(() => String, { description: 'Country ID' })
  @IsString()
  @Length(2, 2)
  countryId: string;
}
