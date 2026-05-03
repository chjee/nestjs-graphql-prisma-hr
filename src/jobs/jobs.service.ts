import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Job, Prisma } from '@prisma/client';
import { handlePrismaMutationError } from '../common/utils/prisma-error.util';

@Injectable()
export class JobsService {
  constructor(private prisma: PrismaService) {}
  private readonly logger = new Logger(JobsService.name);

  async create(data: Prisma.JobCreateInput): Promise<Job> {
    return this.prisma.job.create({ data });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.JobWhereUniqueInput;
    where?: Prisma.JobWhereInput;
    orderBy?: Prisma.JobOrderByWithRelationInput;
  }): Promise<Job[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.job.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async findOne(where: Prisma.JobWhereUniqueInput): Promise<Job> {
    return this.prisma.job.findUnique({ where });
  }

  async update(params: {
    where: Prisma.JobWhereUniqueInput;
    data: Prisma.JobUpdateInput;
  }): Promise<Job> {
    const { where, data } = params;
    try {
      return await this.prisma.job.update({
        data,
        where,
      });
    } catch (e) {
      handlePrismaMutationError(e, 'Job', where, this.logger);
    }
  }

  async remove(where: Prisma.JobWhereUniqueInput): Promise<Job> {
    try {
      return await this.prisma.job.delete({ where });
    } catch (e) {
      handlePrismaMutationError(e, 'Job', where, this.logger);
    }
  }
}
