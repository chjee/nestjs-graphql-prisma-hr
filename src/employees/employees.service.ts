import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Employee, Prisma } from '@prisma/client';
import { handlePrismaMutationError } from '../common/utils/prisma-error.util';
import { withListQueryPolicy } from '../common/utils/query-policy.util';

@Injectable()
export class EmployeesService {
  constructor(private prisma: PrismaService) {}
  private readonly logger = new Logger(EmployeesService.name);

  async create(data: Prisma.EmployeeUncheckedCreateInput): Promise<Employee> {
    return this.prisma.employee.create({ data });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.EmployeeWhereUniqueInput;
    where?: Prisma.EmployeeWhereInput;
    orderBy?: Prisma.EmployeeOrderByWithRelationInput;
  }): Promise<Employee[]> {
    const query = withListQueryPolicy(params, {
      id: 'asc',
    } satisfies Prisma.EmployeeOrderByWithRelationInput);

    return this.prisma.employee.findMany({
      skip: query.skip,
      take: query.take,
      cursor: query.cursor,
      where: query.where,
      orderBy: query.orderBy,
    });
  }

  async findOne(where: Prisma.EmployeeWhereUniqueInput): Promise<Employee> {
    return this.prisma.employee.findUnique({ where });
  }

  async update(params: {
    where: Prisma.EmployeeWhereUniqueInput;
    data: Prisma.EmployeeUpdateInput;
  }): Promise<Employee> {
    const { where, data } = params;
    try {
      return await this.prisma.employee.update({
        data,
        where,
      });
    } catch (e) {
      handlePrismaMutationError(e, 'Employee', where, this.logger);
    }
  }

  async remove(where: Prisma.EmployeeWhereUniqueInput): Promise<Employee> {
    try {
      return await this.prisma.employee.delete({ where });
    } catch (e) {
      handlePrismaMutationError(e, 'Employee', where, this.logger);
    }
  }
}
