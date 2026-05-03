import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import { hashPassword } from '../common/utils/password.util';
import { handlePrismaMutationError } from '../common/utils/prisma-error.util';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  private readonly logger = new Logger(UsersService.name);

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data: {
        ...data,
        password: await hashPassword(data.password),
      },
    });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async findOne(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.findUnique({
      where,
    });
  }

  async findUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.findUnique({
      include: {
        profile: true,
      },
      where,
    });
  }

  async update(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    const updateData = { ...data };
    if (typeof updateData.password === 'string') {
      updateData.password = await hashPassword(updateData.password);
    }

    try {
      return await this.prisma.user.update({
        data: updateData,
        where,
      });
    } catch (e) {
      handlePrismaMutationError(e, 'User', where, this.logger);
    }
  }

  async remove(where: Prisma.UserWhereUniqueInput): Promise<User> {
    try {
      return await this.prisma.user.delete({ where });
    } catch (e) {
      handlePrismaMutationError(e, 'User', where, this.logger);
    }
  }
}
