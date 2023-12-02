import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Department, Prisma } from '@prisma/client';

@Injectable()
export class DepartmentsService {
  constructor(private prisma: PrismaService) {}
  private readonly logger = new Logger(DepartmentsService.name);

  async create(data: Prisma.DepartmentCreateInput): Promise<Department> {
    return this.prisma.department.create({ data });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.DepartmentWhereUniqueInput;
    where?: Prisma.DepartmentWhereInput;
    orderBy?: Prisma.DepartmentOrderByWithRelationInput;
  }): Promise<Department[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.department.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async findOne(where: Prisma.DepartmentWhereUniqueInput): Promise<Department> {
    const department = await this.prisma.department.findUnique({ where });

    if (!department) {
      this.logger.error(`Department with id(${where.id}) not found`);
      throw new NotFoundException();
    }

    return department;
  }

  async update(params: {
    where: Prisma.DepartmentWhereUniqueInput;
    data: Prisma.DepartmentUpdateInput;
  }): Promise<Department> {
    const { where, data } = params;
    return this.prisma.department.update({
      data,
      where,
    });
  }

  async remove(where: Prisma.DepartmentWhereUniqueInput): Promise<any> {
    return this.prisma.department.delete({ where });
  }
}
