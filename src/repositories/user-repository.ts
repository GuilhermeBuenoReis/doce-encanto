import { prisma } from '../../db';

class UserRepository {
  async createUser(email: string, password: string, name: string) {
    return await prisma.user.create({
      data: {
        email,
        password,
        name,
      },
    });
  }

  async findUserByEmail(email: string) {
    return await prisma.user.findUnique({
      where: { email },
    });
  }
}

export { UserRepository };
