import { InputType, Int, Field, GraphQLISODateTime } from '@nestjs/graphql';
import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsString,
  Length,
  Min,
} from 'class-validator';

@InputType({ description: 'Create jobhistory input' })
export class CreateJobhistoryInput {
  @Field(() => Int, { description: 'Employee ID' })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  employeeId: number;

  @Field(() => GraphQLISODateTime, { description: 'Start Date' })
  @IsNotEmpty()
  @IsDate()
  startedAt: Date;

  @Field(() => GraphQLISODateTime, { description: 'End Date' })
  @IsNotEmpty()
  @IsDate()
  endedAt: Date;

  @Field(() => String, { description: 'Job ID' })
  @IsNotEmpty()
  @IsString()
  @Length(1, 10)
  jobId: string;

  @Field(() => Int, { description: 'Department ID' })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  departmentId: number;
}
