import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString, Length, Min } from 'class-validator';

@InputType({ description: 'Create country input' })
export class CreateCountryInput {
  @Field(() => String, { description: 'Country ID' })
  @IsNotEmpty()
  @IsString()
  @Length(2)
  id: string;

  @Field(() => String, { nullable: true, description: 'Country name' })
  @IsString()
  @Length(2, 40)
  name: string;

  @Field(() => Int, { description: 'Region ID' })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  regionId: number;
}
