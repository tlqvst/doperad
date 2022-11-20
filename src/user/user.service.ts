import { Prisma, User } from '.prisma/client';
import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async users(params: {
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

  async createUser(data: Prisma.UserCreateInput): Promise<void> {
    try {
      // Create the user
      const user = await this.prisma.user.create({
        data: {
          ...data,
          password: bcrypt.hashSync(data.password, 12),
        },
      });

      // Find the 'user' role id
      const userRole = await this.prisma.role.findUnique({
        where: { name: 'user' },
      });

      // Assign the default user role
      await this.prisma.rolesOnUser.create({
        data: {
          roleId: userRole.id,
          userId: user.id,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          const target: string = error.meta['target'].toString();
          // unique constraint
          throw new ConflictException(
            `${
              target.charAt(0).toUpperCase() + target.slice(1)
            } already in use`,
          );
        } else throw error;
      } else throw error;
    }
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;

    return this.prisma.user.update({
      data,
      where,
    });
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where,
    });
  }
}
