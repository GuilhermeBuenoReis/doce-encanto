import { describe, it, expect } from 'vitest';
import { UserService } from '../register-service';

describe('register user service', () => {
  it('should be able to register', async () => {
    const userService = new UserService({
      async findUserByEmail(email) {
        return null;
      },

      async createUser(email, password_hash, name) {
        return {
          id: 'user-1',
          email,
          password: password_hash,
          name,
        };
      },
    });

    const { user } = await userService.createUser({
      email: 'test@example.com',
      name: 'Jhon Doe',
      password: '123456',
    });

    expect(user.id).toEqual(expect.any(String));
  });
});
