import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Country, Prisma } from '@prisma/client';

@Injectable()
export class CountriesService {
  constructor(private prisma: PrismaService) {}
  private readonly logger = new Logger(CountriesService.name);

  async create(data: Prisma.CountryUncheckedCreateInput): Promise<Country> {
    return this.prisma.country.create({ data });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CountryWhereUniqueInput;
    where?: Prisma.CountryWhereInput;
    orderBy?: Prisma.CountryOrderByWithRelationInput;
  }): Promise<Country[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.country.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async findOne(where: Prisma.CountryWhereUniqueInput): Promise<Country> {
    return this.prisma.country.findUnique({ where });
  }

  async update(params: {
    where: Prisma.CountryWhereUniqueInput;
    data: Prisma.CountryUpdateInput;
  }): Promise<Country> {
    const { where, data } = params;
    try {
      return await this.prisma.country.update({
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

  async remove(where: Prisma.CountryWhereUniqueInput): Promise<Country> {
    try {
      return await this.prisma.country.delete({ where });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          this.logger.log(`Region with id(${where.id}) not found`);
        }
      }
    }
  }
}
