import {
  ObjectType,
  Field,
  Int,
  Float,
  GraphQLISODateTime,
} from '@nestjs/graphql';
import { Decimal } from '@prisma/client/runtime/library';
import { Department } from './../../departments/entities/department.entity';
import { Job } from './../../jobs/entities/job.entity';
import { Jobhistory } from './../../jobhistories/entities/jobhistory.entity';

@ObjectType({ description: 'Employee object' })
export class Employee {
  @Field(() => Int, { description: 'Employee ID' })
  id: number;

  @Field(() => String, { nullable: true, description: 'Employee first name' })
  firstName?: string;

  @Field(() => String, { description: 'Employee last name' })
  lastName: string;

  @Field(() => String, { description: 'Employee email' })
  email: string;

  @Field(() => String, { nullable: true, description: 'Employee phone number' })
  phone?: string | null;

  @Field(() => GraphQLISODateTime, { description: 'Employee hire date' })
  hiredAt: Date;

  @Field(() => String, { description: 'Employee job ID' })
  jobId: string;

  @Field(() => Float, { description: 'Employee salary' })
  salary: Decimal;

  @Field(() => Float, { nullable: true, description: 'Employee commission' })
  commissionPct?: Decimal | null;

  @Field(() => Int, { description: 'Employee manager ID' })
  managerId?: number;

  @Field(() => Int, { description: 'Employee department ID' })
  departmentId?: number;

  @Field(() => Job, { nullable: true, description: 'Employee job' })
  job?: Job;

  @Field(() => Department, {
    nullable: true,
    description: 'Employee department',
  })
  department?: Department | null;

  @Field(() => Employee, { nullable: true, description: 'Employee manager ID' })
  manager?: Employee;

  @Field(() => [Employee], {
    nullable: true,
    description: 'Employee colleagues',
  })
  otherEmployees?: Employee[];

  @Field(() => [Jobhistory], {
    nullable: true,
    description: 'Employee job histories',
  })
  jobHistories?: Jobhistory[];
}
