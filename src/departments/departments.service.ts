import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Department, Prisma } from '@prisma/client';
import { handlePrismaMutationError } from '../common/utils/prisma-error.util';

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
    return this.prisma.department.findUnique({ where });
  }

  async update(params: {
    where: Prisma.DepartmentWhereUniqueInput;
    data: Prisma.DepartmentUpdateInput;
  }): Promise<Department> {
    const { where, data } = params;
    try {
      return await this.prisma.department.update({
        data,
        where,
      });
    } catch (e) {
      handlePrismaMutationError(e, 'Department', where, this.logger);
    }
  }

  async remove(where: Prisma.DepartmentWhereUniqueInput): Promise<Department> {
    try {
      return await this.prisma.department.delete({ where });
    } catch (e) {
      handlePrismaMutationError(e, 'Department', where, this.logger);
    }
  }
}
