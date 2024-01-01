import { Injectable, Logger } from '@nestjs/common';
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
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          this.logger.log(`Location with id(${where.id}) not found`);
        }
      }
    }
  }

  async remove(where: Prisma.LocationWhereUniqueInput): Promise<Location> {
    try {
      return await this.prisma.location.delete({ where });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          this.logger.log(`Location with id(${where.id}) not found`);
        }
      }
    }
  }
}
