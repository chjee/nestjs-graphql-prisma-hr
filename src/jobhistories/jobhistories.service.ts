import { Injectable, Logger } from '@nestjs/common';
import { JobHistory, Prisma } from '@prisma/client';
import { handlePrismaMutationError } from '../common/utils/prisma-error.util';
import { withListQueryPolicy } from '../common/utils/query-policy.util';
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
    orderBy?:
      | Prisma.JobHistoryOrderByWithRelationInput
      | Prisma.JobHistoryOrderByWithRelationInput[];
  }): Promise<JobHistory[]> {
    const query = withListQueryPolicy(params, [
      { employeeId: 'asc' },
      { startedAt: 'asc' },
    ] satisfies Prisma.JobHistoryOrderByWithRelationInput[]);

    return this.prisma.jobHistory.findMany({
      skip: query.skip,
      take: query.take,
      cursor: query.cursor,
      where: query.where,
      orderBy: query.orderBy,
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
      handlePrismaMutationError(e, 'JobHistory', where, this.logger);
    }
  }

  async remove(where: Prisma.JobHistoryWhereUniqueInput): Promise<JobHistory> {
    try {
      return await this.prisma.jobHistory.delete({ where });
    } catch (e) {
      handlePrismaMutationError(e, 'JobHistory', where, this.logger);
    }
  }
}
