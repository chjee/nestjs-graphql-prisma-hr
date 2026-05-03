import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Profile } from '@prisma/client';
import { handlePrismaMutationError } from '../common/utils/prisma-error.util';

@Injectable()
export class ProfilesService {
  constructor(private prisma: PrismaService) {}
  private readonly logger = new Logger(ProfilesService.name);

  async create(data: Prisma.ProfileUncheckedCreateInput): Promise<Profile> {
    return this.prisma.profile.create({ data });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ProfileWhereUniqueInput;
    where?: Prisma.ProfileWhereInput;
    orderBy?: Prisma.ProfileOrderByWithRelationInput;
  }): Promise<Profile[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.profile.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async findOne(where: Prisma.ProfileWhereUniqueInput): Promise<Profile> {
    return this.prisma.profile.findUnique({
      where,
    });
  }

  async update(params: {
    where: Prisma.ProfileWhereUniqueInput;
    data: Prisma.ProfileUpdateInput;
  }): Promise<Profile> {
    const { where, data } = params;
    try {
      return await this.prisma.profile.update({
        data,
        where,
      });
    } catch (e) {
      handlePrismaMutationError(e, 'Profile', where, this.logger);
    }
  }

  async remove(where: Prisma.ProfileWhereUniqueInput): Promise<Profile> {
    try {
      return await this.prisma.profile.delete({ where });
    } catch (e) {
      handlePrismaMutationError(e, 'Profile', where, this.logger);
    }
  }
}
