import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Job, Prisma } from '@prisma/client';

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
    const job = await this.prisma.job.findUnique({ where });

    if (!job) {
      this.logger.error(`Job with id(${where.id}) not found`);
      throw new NotFoundException();
    }

    return job;
  }

  async update(params: {
    where: Prisma.JobWhereUniqueInput;
    data: Prisma.JobUpdateInput;
  }): Promise<Job> {
    const { where, data } = params;
    return this.prisma.job.update({
      data,
      where,
    });
  }

  async remove(where: Prisma.JobWhereUniqueInput): Promise<Job | null> {
    return this.prisma.job.delete({ where });
  }
}
