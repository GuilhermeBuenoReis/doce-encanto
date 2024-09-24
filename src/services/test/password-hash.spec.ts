import { describe, it, expect } from 'vitest';
import { UserService } from '../register-service';
import { compare } from 'bcryptjs';

describe('Password Hash Service', () => {
  it('should hash user password upon registration', async () => {
    const userService = new UserService({
      async findUserByEmail(email) {
        return null;
      },

      async createUser(email, password_hash, name) {
        return {
          id: 'user-1',
          email: email,
          password: password_hash,
          name: name,
        };
      },
    });
    const { user } = await userService.createUser({
      email: 'test@example.com',
      name: 'Jhon Doe',
      password: '123456',
    });

    const isPasswordCorretlyHashed = await compare('123456', user.password);

    expect(isPasswordCorretlyHashed).toBe(true);
  });
});
