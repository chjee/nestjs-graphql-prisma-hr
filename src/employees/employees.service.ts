import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Employee, Prisma } from '@prisma/client';

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
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.employee.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async findOne(where: Prisma.EmployeeWhereUniqueInput): Promise<Employee> {
    const employee = await this.prisma.employee.findUnique({ where });

    if (!employee) {
      this.logger.error(`Employee with id(${where.id}) not found`);
      throw new NotFoundException();
    }

    return employee;
  }

  async update(params: {
    where: Prisma.EmployeeWhereUniqueInput;
    data: Prisma.EmployeeUpdateInput;
  }): Promise<Employee> {
    const { where, data } = params;
    return this.prisma.employee.update({
      data,
      where,
    });
  }

  async remove(where: Prisma.EmployeeWhereUniqueInput): Promise<any> {
    return this.prisma.employee.delete({ where });
  }
}
