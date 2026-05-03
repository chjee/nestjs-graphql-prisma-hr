import { InputType, Int, Field } from '@nestjs/graphql';
import { Decimal } from '@prisma/client/runtime/library';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Length,
  Max,
  Min,
} from 'class-validator';

@InputType({ description: 'Create job input' })
export class CreateJobInput {
  @Field(() => String, { description: 'Job ID' })
  @IsNotEmpty()
  @Length(2, 10)
  id: string;

  @Field(() => String, { description: 'Job title' })
  @IsNotEmpty()
  @Length(2, 35)
  title: string;

  @Field(() => Int, { nullable: true, description: 'Minimum salary' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(99999999)
  minSalary?: Decimal | null;

  @Field(() => Int, { nullable: true, description: 'Maximum salary' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(99999999)
  maxSalary?: Decimal | null;
}
