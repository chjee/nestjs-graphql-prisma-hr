import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString, Length, Min } from 'class-validator';

@InputType()
export class CreateCountryInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @Length(2)
  id: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @Length(2, 40)
  name: string;

  @Field(() => Int)
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  regionId: number;
}
