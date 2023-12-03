import { ObjectType, Field, Float } from '@nestjs/graphql';
import { Decimal } from '@prisma/client/runtime/library';
import { Employee } from './../../employees/entities/employee.entity';
import { Jobhistory } from './../../jobhistories/entities/jobhistory.entity';

@ObjectType({ description: 'Job object' })
export class Job {
  @Field(() => String, { description: 'Job ID' })
  id: string;

  @Field(() => String, { description: 'Job title' })
  title: string;

  @Field(() => Float, { nullable: true, description: 'Minimum salary' })
  minSalary?: Decimal;

  @Field(() => Float, { nullable: true, description: 'Maximum salary' })
  maxSalary?: Decimal;

  @Field(() => [Employee], { nullable: true, description: 'Department ID' })
  employees?: Employee[];

  @Field(() => [Jobhistory], { nullable: true, description: 'Job histories' })
  jobHistories?: Jobhistory[];
}
