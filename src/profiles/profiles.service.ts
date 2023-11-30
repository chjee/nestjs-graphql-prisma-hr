import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Profile } from '@prisma/client';

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
    const profile = await this.prisma.profile.findUnique({
      where,
    });

    if (!profile) {
      this.logger.error(`Profile with id ${where.id} not found`);
      throw new NotFoundException();
    }

    return profile;
  }

  async update(params: {
    where: Prisma.ProfileWhereUniqueInput;
    data: Prisma.ProfileUpdateInput;
  }): Promise<Profile> {
    const { where, data } = params;
    return this.prisma.profile.update({
      data,
      where,
    });
  }

  async remove(where: Prisma.ProfileWhereUniqueInput): Promise<Profile | null> {
    return this.prisma.profile.delete({
      where,
    });
  }
}
