import { InputType, Int, Field } from '@nestjs/graphql';
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

  @Field(() => Date, { description: 'Start Date' })
  @IsNotEmpty()
  @IsDate()
  startedAt: Date;

  @Field(() => Date, { description: 'End Date' })
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
