import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { DepartmentsService } from './departments.service';
import { Department } from './entities/department.entity';
import { CreateDepartmentInput } from './dto/create-department.input';
import { UpdateDepartmentInput } from './dto/update-department.input';
import { EmployeesService } from '../employees/employees.service';
import { LocationsService } from '../locations/locations.service';
import { JobhistoriesService } from '../jobhistories/jobhistories.service';
import { Location } from '../locations/entities/location.entity';
import { Employee } from '../employees/entities/employee.entity';
import { Jobhistory } from '../jobhistories/entities/jobhistory.entity';

@Resolver(() => Department)
export class DepartmentsResolver {
  constructor(
    private readonly departmentsService: DepartmentsService,
    private readonly employeesService: EmployeesService,
    private readonly locationsService: LocationsService,
    private readonly jobhistoriesService: JobhistoriesService,
  ) {}

  @Mutation(() => Department)
  async createDepartment(
    @Args('createDepartmentInput') createDepartmentInput: CreateDepartmentInput,
  ): Promise<Department> {
    return this.departmentsService.create(createDepartmentInput);
  }

  @Query(() => [Department], { name: 'getDepartments' })
  async findAll(
    @Args('skip', { type: () => Int, nullable: true }) skip?: number,
    @Args('take', { type: () => Int, nullable: true }) take?: number,
  ): Promise<Department[]> {
    return this.departmentsService.findAll({
      skip: skip,
      take: take,
    });
  }

  @Query(() => Department, { nullable: true, name: 'getDepartmentById' })
  async findOne(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Department> {
    return this.departmentsService.findOne({ id: id });
  }

  @ResolveField()
  async location(@Parent() { locationId }: Department): Promise<Location> {
    return this.locationsService.findOne({ id: locationId });
  }

  @ResolveField()
  async manager(@Parent() { managerId }: Department): Promise<Employee> {
    return this.employeesService.findOne({ id: managerId });
  }

  @ResolveField()
  async employees(@Parent() { id }: Department): Promise<Employee[]> {
    return this.employeesService.findAll({ where: { departmentId: id } });
  }

  @ResolveField()
  async jobhistories(@Parent() { id }: Department): Promise<Jobhistory[]> {
    return this.jobhistoriesService.findAll({ where: { departmentId: id } });
  }

  @Mutation(() => Department, { nullable: true, name: 'updateDepartment' })
  async updateDepartment(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateDepartmentInput') updateDepartmentInput: UpdateDepartmentInput,
  ): Promise<Department> {
    return this.departmentsService.update({
      where: { id: id },
      data: updateDepartmentInput,
    });
  }

  @Mutation(() => Department, { nullable: true, name: 'removeDepartment' })
  async removeDepartment(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<any> {
    return this.departmentsService.remove({ id: id });
  }
}
