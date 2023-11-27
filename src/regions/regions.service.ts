import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Region } from '@prisma/client';

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
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.region.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async findOne(where: Prisma.RegionWhereUniqueInput): Promise<Region> {
    const region = await this.prisma.region.findUnique({ where });

    if (!region) {
      this.logger.error(`Region with id(${where.id}) not found`);
      throw new NotFoundException();
    }

    return region;
  }

  async update(params: {
    where: Prisma.RegionWhereUniqueInput;
    data: Prisma.RegionUpdateInput;
  }): Promise<Region> {
    const { where, data } = params;
    return this.prisma.region.update({
      data,
      where,
    });
  }

  async remove(where: Prisma.RegionWhereUniqueInput): Promise<Region | null> {
    return this.prisma.region.delete({ where });
  }
}
