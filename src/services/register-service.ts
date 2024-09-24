import type { User } from '@prisma/client';
import type { UserRepository } from '../repositories/user-repository';
import { hash, compare } from 'bcryptjs';

interface RegisterServiceRequest {
  name: string;
  email: string;
  password: string;
}

interface UserServiceResponse {
  user: User;
}

class UserService {
  constructor(private userRepository: UserRepository) {}

  async createUser({
    email,
    password,
    name,
  }: RegisterServiceRequest): Promise<UserServiceResponse> {
    const emailAlreadyExists = await this.userRepository.findUserByEmail(email);
    if (emailAlreadyExists) {
      throw new Error('Email already exists');
    }

    const password_hash = await hash(password, 6);

    const user = await this.userRepository.createUser(
      email,
      password_hash,
      name
    );

    return { user };
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findUserByEmail(email);
  }

  async comparePassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return await compare(password, hashedPassword);
  }
}

export { UserService };
