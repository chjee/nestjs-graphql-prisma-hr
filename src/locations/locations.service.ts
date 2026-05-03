import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Location, Prisma } from '@prisma/client';
import { handlePrismaMutationError } from '../common/utils/prisma-error.util';

@Injectable()
export class LocationsService {
  constructor(private prisma: PrismaService) {}
  private readonly logger = new Logger(LocationsService.name);

  async create(data: Prisma.LocationUncheckedCreateInput): Promise<Location> {
    return this.prisma.location.create({ data });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.LocationWhereUniqueInput;
    where?: Prisma.LocationWhereInput;
    orderBy?: Prisma.LocationOrderByWithRelationInput;
  }): Promise<Location[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.location.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async findOne(where: Prisma.LocationWhereUniqueInput): Promise<Location> {
    return this.prisma.location.findUnique({ where });
  }

  async update(params: {
    where: Prisma.LocationWhereUniqueInput;
    data: Prisma.LocationUpdateInput;
  }): Promise<Location> {
    const { where, data } = params;
    try {
      return await this.prisma.location.update({
        data,
        where,
      });
    } catch (e) {
      handlePrismaMutationError(e, 'Location', where, this.logger);
    }
  }

  async remove(where: Prisma.LocationWhereUniqueInput): Promise<Location> {
    try {
      return await this.prisma.location.delete({ where });
    } catch (e) {
      handlePrismaMutationError(e, 'Location', where, this.logger);
    }
  }
}
