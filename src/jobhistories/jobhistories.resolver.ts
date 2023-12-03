import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { JobhistoriesService } from './jobhistories.service';
import { Jobhistory } from './entities/jobhistory.entity';
import { CreateJobhistoryInput } from './dto/create-jobhistory.input';
import { Prisma } from '@prisma/client';
import { DepartmentsService } from '../departments/departments.service';
import { EmployeesService } from '../employees/employees.service';
import { JobsService } from '../jobs/jobs.service';
import { Job } from '../jobs/entities/job.entity';
import { Employee } from '../employees/entities/employee.entity';
import { Department } from '../departments/entities/department.entity';

@Resolver(() => Jobhistory)
export class JobhistoriesResolver {
  constructor(
    private readonly jobhistoriesService: JobhistoriesService,
    private readonly jobsService: JobsService,
    private readonly employeesService: EmployeesService,
    private readonly departmentsService: DepartmentsService,
  ) {}

  @Mutation(() => Jobhistory)
  async createJobhistory(
    @Args('createJobhistoryInput') createJobhistoryInput: CreateJobhistoryInput,
  ): Promise<Jobhistory> {
    return this.jobhistoriesService.create(createJobhistoryInput);
  }

  @Query(() => [Jobhistory], { name: 'getJobHistories' })
  async findAll(
    @Args('skip', { type: () => Int, nullable: true }) skip?: number,
    @Args('take', { type: () => Int, nullable: true }) take?: number,
    @Args('where', { type: () => String, nullable: true })
    where?: Prisma.JobHistoryWhereInput,
  ): Promise<Jobhistory[]> {
    return this.jobhistoriesService.findAll({
      skip: skip,
      take: take,
      where: where,
    });
  }

  @Query(() => Jobhistory, { name: 'getJobHistoryByEmployeeId' })
  async findOne(
    @Args('employeeId', { type: () => Int }) employeeId: number,
    @Args('startedAt', { type: () => String }) startedAt: Date,
  ): Promise<Jobhistory> {
    return this.jobhistoriesService.findOne({
      employeeId_startedAt: {
        employeeId: employeeId,
        startedAt: startedAt,
      },
    });
  }

  @ResolveField()
  async job(@Parent() { jobId }: Jobhistory): Promise<Job> {
    return this.jobsService.findOne({ id: jobId });
  }

  @ResolveField()
  async employee(@Parent() { employeeId }: Jobhistory): Promise<Employee> {
    return this.employeesService.findOne({ id: employeeId });
  }

  @ResolveField()
  async department(
    @Parent() { departmentId }: Jobhistory,
  ): Promise<Department> {
    return this.departmentsService.findOne({ id: departmentId });
  }

  @Mutation(() => Jobhistory)
  async removeJobhistory(
    @Args('employeeId', { type: () => Int }) employeeId: number,
    @Args('startedAt', { type: () => String }) startedAt: Date,
  ) {
    return this.jobhistoriesService.remove({
      employeeId_startedAt: {
        employeeId: employeeId,
        startedAt: startedAt,
      },
    });
  }
}