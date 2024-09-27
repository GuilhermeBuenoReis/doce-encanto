import { describe, it, expect } from 'vitest';
import { AuthenticateService } from '../authenticate';
import type { UserRepository } from '../../repositories/user-repository';
import { hash } from 'bcryptjs';

describe('AuthenticateService', () => {
  it('should be able to authenticate a user', async () => {
    const password = '123456'; // A senha que vamos usar para autenticação
    const hashedPassword = await hash(password, 10); // Cria o hash da senha

    const userRepository: UserRepository = {
      async findUserByEmail(email: string) {
        return {
          id: 'user-1',
          name: 'John Doe',
          password: hashedPassword, // Use o hash da senha aqui
          email,
        };
      },
      async createUser(email: string, password_hash: string, name: string) {
        // Para o teste, não precisamos implementar isso
        throw new Error('Not implemented');
      },
    };

    const authenticateService = new AuthenticateService(userRepository);

    const { user } = await authenticateService.execute({
      email: 'test@example.com',
      password, // Use a senha original aqui para comparação
    });

    expect(user.id).toEqual('user-1');
  });
});
