import type { PrismaClient, User } from '@prisma/client';
import { prisma } from '../../db';

export class UserRepository {
  async findUserByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { email },
    });
  }

  async createUser(
    email: string,
    password_hash: string,
    name: string
  ): Promise<User> {
    return await prisma.user.create({
      data: {
        email,
        password: password_hash,
        name,
      },
    });
  }
}
