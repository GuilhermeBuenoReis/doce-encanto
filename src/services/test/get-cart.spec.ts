import { describe, it, expect, vi } from 'vitest';
import { GetCartService } from '../get-cart-service';
import type { CartRepository } from '../../repositories/cart-repository';
import type { Cart } from '@prisma/client';

// Definindo um tipo que inclui cartItems
interface CartWithItems extends Cart {
  cartItems: never[];
}

describe('GetCartService', () => {
  it('should return the cart when it exists', async () => {
    const mockCart: CartWithItems = {
      id: 'cart-1',
      userId: 'user-1',
      totalPrice: 100,
      status: 'active',
      cartItems: [], // Incluímos a propriedade cartItems
    };

    const cartRepository: CartRepository = {
      createCart: async () => null,
      findCartByUserId: vi.fn(async (userId: string) => mockCart),
      addCartItem: async () => null,
      updateCartItem: async () => null,
      findProductById: async () => null,
      findCartItem: async () => null,
      updateCartTotal: async () => null,
      getCartItems: async () => [],
    };

    const getCartService = new GetCartService();
    // biome-ignore lint/complexity/useLiteralKeys: <explanation>
    getCartService['cartRepository'] = cartRepository;

    const cart = await getCartService.getCart('user-1');

    expect(cartRepository.findCartByUserId).toHaveBeenCalledWith('user-1');
    expect(cart).toEqual(mockCart);
  });

  it('should return null when the cart does not exist', async () => {
    const cartRepository: CartRepository = {
      createCart: async () => null,
      findCartByUserId: vi.fn(async () => null),
      addCartItem: async () => null,
      updateCartItem: async () => null,
      findProductById: async () => null,
      findCartItem: async () => null,
      updateCartTotal: async () => null,
      getCartItems: async () => [],
    };

    const getCartService = new GetCartService();
    // biome-ignore lint/complexity/useLiteralKeys: <explanation>
    getCartService['cartRepository'] = cartRepository;

    const cart = await getCartService.getCart('user-1');

    expect(cartRepository.findCartByUserId).toHaveBeenCalledWith('user-1');
    expect(cart).toBeNull();
  });
});
