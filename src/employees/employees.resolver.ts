import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { EmployeesService } from './employees.service';
import { Employee } from './entities/employee.entity';
import { CreateEmployeeInput } from './dto/create-employee.input';
import { UpdateEmployeeInput } from './dto/update-employee.input';
import { DepartmentsService } from '../departments/departments.service';
import { JobsService } from '../jobs/jobs.service';
import { Department } from 'src/departments/entities/department.entity';
import { Job } from 'src/jobs/entities/job.entity';

@Resolver(() => Employee)
export class EmployeesResolver {
  constructor(
    private readonly employeesService: EmployeesService,
    private readonly departmentsService: DepartmentsService,
    private readonly jobsService: JobsService,
  ) {}

  @Mutation(() => Employee)
  async createEmployee(
    @Args('createEmployeeInput') createEmployeeInput: CreateEmployeeInput,
  ): Promise<Employee> {
    return this.employeesService.create(createEmployeeInput);
  }

  @Query(() => [Employee], { name: 'getEmployees' })
  async findAll(
    @Args('skip', { type: () => Int, nullable: true }) skip?: number,
    @Args('take', { type: () => Int, nullable: true }) take?: number,
  ): Promise<Employee[]> {
    return this.employeesService.findAll({
      skip: skip,
      take: take,
    });
  }

  @Query(() => Employee, { name: 'getEmployeeById' })
  async findOne(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Employee> {
    return this.employeesService.findOne({ id: id });
  }

  @ResolveField()
  async job(@Parent() { jobId }: Employee): Promise<Job> {
    return this.jobsService.findOne({ id: jobId });
  }

  @ResolveField()
  async department(@Parent() { departmentId }: Employee): Promise<Department> {
    return this.departmentsService.findOne({ id: departmentId });
  }

  @ResolveField()
  async manager(@Parent() { managerId }: Employee): Promise<Employee> {
    return this.employeesService.findOne({ id: managerId });
  }

  @ResolveField()
  async otherEmployees(@Parent() { id }: Employee): Promise<Employee[]> {
    return this.employeesService.findAll({ where: { managerId: id } });
  }

  @Mutation(() => Employee)
  async updateEmployee(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateEmployeeInput') updateEmployeeInput: UpdateEmployeeInput,
  ): Promise<Employee> {
    return this.employeesService.update({
      where: { id: id },
      data: updateEmployeeInput,
    });
  }

  @Mutation(() => Employee)
  async removeEmployee(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<any> {
    return this.employeesService.remove({ id: id });
  }
}
