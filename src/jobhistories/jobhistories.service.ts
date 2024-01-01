import { Injectable, Logger } from '@nestjs/common';
import { JobHistory, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class JobhistoriesService {
  constructor(private prisma: PrismaService) {}
  private readonly logger = new Logger(JobhistoriesService.name);

  async create(
    data: Prisma.JobHistoryUncheckedCreateInput,
  ): Promise<JobHistory> {
    return this.prisma.jobHistory.create({ data });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.JobHistoryWhereUniqueInput;
    where?: Prisma.JobHistoryWhereInput;
    orderBy?: Prisma.JobHistoryOrderByWithRelationInput;
  }): Promise<JobHistory[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.jobHistory.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async findOne(where: Prisma.JobHistoryWhereUniqueInput): Promise<JobHistory> {
    return this.prisma.jobHistory.findUnique({ where });
  }

  async update(params: {
    where: Prisma.JobHistoryWhereUniqueInput;
    data: Prisma.JobHistoryUpdateInput;
  }): Promise<JobHistory> {
    const { where, data } = params;
    try {
      return await this.prisma.jobHistory.update({
        data,
        where,
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          this.logger.log(`JobHistory with id(${where.employeeId}) not found`);
        }
      }
    }
  }

  async remove(where: Prisma.JobHistoryWhereUniqueInput): Promise<JobHistory> {
    try {
      return await this.prisma.jobHistory.delete({ where });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          this.logger.log(`JobHistory with id(${where.employeeId}) not found`);
        }
      }
    }
  }
}
