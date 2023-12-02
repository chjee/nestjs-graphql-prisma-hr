import { InputType, Int, Field, Float } from '@nestjs/graphql';
import {
  IsDate,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Min,
} from 'class-validator';

@InputType({ description: 'Create employee input' })
export class CreateEmployeeInput {
  @Field(() => Int, { description: 'Employee ID' })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  id: number;

  @Field(() => String, { nullable: true, description: 'Employee first name' })
  @IsString()
  @Length(2, 20)
  firstName?: string;

  @Field(() => String, { description: 'Employee last name' })
  @IsNotEmpty()
  @IsString()
  @Length(2, 20)
  lastName: string;

  @Field(() => String, { description: 'Employee email' })
  @IsNotEmpty()
  @IsEmail()
  @Length(2, 40)
  email: string;

  @Field(() => String, { nullable: true, description: 'Employee phone number' })
  @IsString()
  @Length(2, 20)
  phone?: string | null;

  @Field(() => Date, { description: 'Employee hire date' })
  @IsDate()
  hiredAt: Date;

  @Field(() => String, { description: 'Employee job ID' })
  @IsNotEmpty()
  @IsString()
  @Length(2, 10)
  jobId: string;

  @Field(() => Float, { description: 'Employee salary' })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  salary: number;

  @Field(() => Float, { nullable: true, description: 'Employee commission' })
  @IsNumber()
  commissionPct?: number | null;

  @Field(() => Int, { description: 'Employee manager ID' })
  @IsNumber()
  managerId?: number;

  @Field(() => Int, { description: 'Employee department ID' })
  @IsNumber()
  departmentId?: number;
}
