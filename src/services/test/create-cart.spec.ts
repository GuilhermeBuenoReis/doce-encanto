import { describe, it, expect } from 'vitest';
import { CreateCartService } from '../create-cart-service';
import type { CartRepository } from '../../repositories/cart-repository';
import type { Cart } from '@prisma/client';

describe('CreateCartService', () => {
  it('should be able to create a cart', async () => {
    const cartRepository: CartRepository = {
      createCart: async (userId: string) => {
        return {
          id: 'cart-1',
          userId,
          totalPrice: 0,
          status: 'active',
          cartItems: [],
        } as Cart;
      },
      findCartByUserId: async (userId: string) => null,
      addCartItem: async () => null,
      updateCartItem: async () => null,
      findProductById: async () => null,
      findCartItem: async () => null,
      updateCartTotal: async (cartId: string, newTotal: number) => null, // Ajuste conforme necessário
      getCartItems: async (cartId: string) => [], // Ajuste conforme necessário
    };

    const createCartService = new CreateCartService(cartRepository);
    const cart = await createCartService.createCart('user-1');

    expect(cart.id).toEqual(expect.any(String));
    expect(cart.userId).toBe('user-1');
  });
});
