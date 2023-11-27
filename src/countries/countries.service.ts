import { Injectable, Logger, NotFoundException } from '@nestjs/common';
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
    const country = await this.prisma.country.findUnique({ where });

    if (!country) {
      this.logger.error(`Country with id(${where.id}) not found`);
      throw new NotFoundException();
    }

    return country;
  }

  async update(params: {
    where: Prisma.CountryWhereUniqueInput;
    data: Prisma.CountryUpdateInput;
  }): Promise<Country> {
    const { where, data } = params;
    return this.prisma.country.update({
      data,
      where,
    });
  }

  async remove(where: Prisma.CountryWhereUniqueInput): Promise<Country | null> {
    return this.prisma.country.delete({ where });
  }
}
