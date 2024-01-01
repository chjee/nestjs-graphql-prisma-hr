import { Injectable, Logger } from '@nestjs/common';
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
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          this.logger.log(`Region with id(${where.id}) not found`);
        }
      }
    }
  }

  async remove(where: Prisma.RegionWhereUniqueInput): Promise<Region> {
    try {
      return await this.prisma.region.delete({ where });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          this.logger.log(`Region with id(${where.id}) not found`);
        }
      }
    }
  }
}
