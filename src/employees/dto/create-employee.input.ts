import {
  InputType,
  Int,
  Field,
  Float,
  GraphQLISODateTime,
} from '@nestjs/graphql';
import {
  IsDate,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
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
  @IsOptional()
  @IsString()
  @Length(2, 20)
  firstName?: string | null;

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
  @IsOptional()
  @IsString()
  @Length(2, 20)
  phone?: string | null;

  @Field(() => GraphQLISODateTime, { description: 'Employee hire date' })
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
  @IsOptional()
  @IsNumber()
  commissionPct?: number | null;

  @Field(() => Int, { nullable: true, description: 'Employee manager ID' })
  @IsOptional()
  @IsInt()
  @Min(1)
  managerId?: number | null;

  @Field(() => Int, { nullable: true, description: 'Employee department ID' })
  @IsOptional()
  @IsInt()
  @Min(1)
  departmentId?: number | null;
}
