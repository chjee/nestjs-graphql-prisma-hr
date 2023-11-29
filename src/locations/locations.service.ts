import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Location, Prisma } from '@prisma/client';

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
    const location = await this.prisma.location.findUnique({ where });

    if (!location) {
      this.logger.error(`Location with id(${where.id}) not found`);
      throw new NotFoundException();
    }

    return location;
  }

  async update(params: {
    where: Prisma.LocationWhereUniqueInput;
    data: Prisma.LocationUpdateInput;
  }): Promise<Location> {
    const { where, data } = params;
    return this.prisma.location.update({
      data,
      where,
    });
  }

  async remove(
    where: Prisma.LocationWhereUniqueInput,
  ): Promise<Location | null> {
    return this.prisma.location.delete({ where });
  }
}
