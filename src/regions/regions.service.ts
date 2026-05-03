import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Region } from '@prisma/client';
import { handlePrismaMutationError } from '../common/utils/prisma-error.util';
import { withListQueryPolicy } from '../common/utils/query-policy.util';

@Injectable()
export class RegionsService {
  constructor(private prisma: PrismaService) {}
  private readonly logger = new Logger(RegionsService.name);

  async create(data: Prisma.RegionCreateInput): Promise<Region> {
    return this.prisma.region.create({ data });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.RegionWhereUniqueInput;
    where?: Prisma.RegionWhereInput;
    orderBy?: Prisma.RegionOrderByWithRelationInput;
  }): Promise<Region[]> {
    const query = withListQueryPolicy(params, {
      id: 'asc',
    } satisfies Prisma.RegionOrderByWithRelationInput);

    return this.prisma.region.findMany({
      skip: query.skip,
      take: query.take,
      cursor: query.cursor,
      where: query.where,
      orderBy: query.orderBy,
    });
  }

  async findOne(where: Prisma.RegionWhereUniqueInput): Promise<Region> {
    return this.prisma.region.findUnique({ where });
  }

  async update(params: {
    where: Prisma.RegionWhereUniqueInput;
    data: Prisma.RegionUpdateInput;
  }): Promise<Region> {
    const { where, data } = params;
    try {
      return await this.prisma.region.update({
        data,
        where,
      });
    } catch (e) {
      handlePrismaMutationError(e, 'Region', where, this.logger);
    }
  }

  async remove(where: Prisma.RegionWhereUniqueInput): Promise<Region> {
    try {
      return await this.prisma.region.delete({ where });
    } catch (e) {
      handlePrismaMutationError(e, 'Region', where, this.logger);
    }
  }
}
