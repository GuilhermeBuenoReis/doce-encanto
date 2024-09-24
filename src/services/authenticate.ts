import type { User } from '@prisma/client';
import type { UserRepository } from '../repositories/user-repository';
import { compare } from 'bcryptjs';

interface AuthenticateServiceRequest {
  email: string;
  password: string;
}

interface AuthenticateServiceResponse {
  user: User;
}

export class AuthenticateService {
  constructor(private usersRepository: UserRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateServiceRequest): Promise<AuthenticateServiceResponse> {
    const user = await this.usersRepository.findUserByEmail(email);

    if (!user) {
      throw new Error();
    }

    const doestPasswordMatches = await compare(password, user.password);

    if (!doestPasswordMatches) {
      throw new Error();
    }

    return {
      user,
    };
  }
}
