import { describe, it, expect, beforeEach } from 'vitest';
import { AuthenticateService } from '../authenticate';
import { hash } from 'bcryptjs';
import { UserRepository } from '../../repositories/user-repository';

describe('AuthenticateService', () => {
  it('should be able to authenticate a user', async () => {
    const repository = new UserRepository();
    const service = new AuthenticateService(repository);

    const existingUser = await repository.findUserByEmail('jhondoe@gmail.com');
    if (!existingUser) {
      await repository.createUser(
        'jhondoe@gmail.com',
        await hash('123456', 12),
        'John Doe'
      );
    }
    const { user } = await service.execute({
      email: 'jhondoe@gmail.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
    expect(user.email).toBe('jhondoe@gmail.com');
  });
});
