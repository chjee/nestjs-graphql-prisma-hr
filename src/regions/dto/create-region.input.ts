import { InputType, Field, Int } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, Length, Min } from 'class-validator';

@InputType({ description: 'Create region input' })
export class CreateRegionInput {
  @Field(() => Int, { description: 'Region ID)' })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  id: number;

  @Field(() => String, { description: 'Region name' })
  @IsNotEmpty()
  @Length(3, 25)
  name: string;
}
