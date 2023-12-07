import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Employee } from './../../employees/entities/employee.entity';
import { Job } from './../../jobs/entities/job.entity';
import { Department } from './../../departments/entities/department.entity';

@ObjectType({ description: 'Jobhistory Object' })
export class Jobhistory {
  @Field(() => Int, { description: 'Employee ID' })
  employeeId: number;

  @Field(() => Date, { description: 'Start Date' })
  startedAt: Date;

  @Field(() => Date, { description: 'End Date' })
  endedAt: Date;

  @Field(() => String, { description: 'Job ID' })
  jobId: string;

  @Field(() => Int, { description: 'Department ID' })
  departmentId: number;

  @Field(() => Employee, { nullable: true, description: 'Employee object' })
  employee?: Employee | null;

  @Field(() => Job, { nullable: true, description: 'Job object' })
  job?: Job | null;

  @Field(() => Department, { nullable: true, description: 'Department object' })
  department?: Department | null;
}
