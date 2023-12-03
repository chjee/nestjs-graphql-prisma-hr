import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { JobsService } from './jobs.service';
import { EmployeesService } from '../employees/employees.service';
import { JobhistoriesService } from '../jobhistories/jobhistories.service';
import { Job } from './entities/job.entity';
import { CreateJobInput } from './dto/create-job.input';
import { UpdateJobInput } from './dto/update-job.input';
import { Employee } from '../employees/entities/employee.entity';
import { Jobhistory } from '../jobhistories/entities/jobhistory.entity';

@Resolver(() => Job)
export class JobsResolver {
  constructor(
    private readonly jobsService: JobsService,
    private readonly employeesService: EmployeesService,
    private readonly jobhistoriesService: JobhistoriesService,
  ) {}

  @Mutation(() => Job)
  async createJob(
    @Args('createJobInput') createJobInput: CreateJobInput,
  ): Promise<Job> {
    return this.jobsService.create(createJobInput);
  }

  @Query(() => [Job], { name: 'getJobs' })
  async findAll(
    @Args('skip', { type: () => Int, nullable: true }) skip?: number,
    @Args('take', { type: () => Int, nullable: true }) take?: number,
  ): Promise<Job[]> {
    return this.jobsService.findAll({
      skip: skip,
      take: take,
    });
  }

  @Query(() => Job, { name: 'getJobById' })
  async findOne(@Args('id', { type: () => String }) id: string): Promise<Job> {
    return this.jobsService.findOne({ id: id });
  }

  @ResolveField()
  async employees(@Parent() { id }: Job): Promise<Employee[]> {
    return this.employeesService.findAll({
      where: { jobId: id },
    });
  }

  @ResolveField()
  async jobHistories(@Parent() { id }: Job): Promise<Jobhistory[]> {
    return this.jobhistoriesService.findAll({
      where: { jobId: id },
    });
  }

  @Mutation(() => Job)
  updateJob(
    @Args('id', { type: () => String }) id: string,
    @Args('updateJobInput') updateJobInput: UpdateJobInput,
  ): Promise<Job> {
    return this.jobsService.update({
      where: { id: id },
      data: updateJobInput,
    });
  }

  @Mutation(() => Job)
  removeJob(@Args('id', { type: () => String }) id: string) {
    return this.jobsService.remove({ id: id });
  }
}
