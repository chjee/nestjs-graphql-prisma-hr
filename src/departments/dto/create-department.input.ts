import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsInt, Min, IsString, Length } from 'class-validator';

@InputType({ description: 'Create department input' })
export class CreateDepartmentInput {
  @Field(() => Int, { description: 'Department ID' })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  id: number;

  @Field(() => String, { description: 'Department name' })
  @IsNotEmpty()
  @IsString()
  @Length(2, 30)
  name: string;

  @Field(() => Int, { description: 'Department manager ID' })
  @IsInt()
  @Min(1)
  managerId: number;

  @Field(() => Int, { description: 'Department location ID' })
  @IsInt()
  @Min(1)
  locationId: number;
}
