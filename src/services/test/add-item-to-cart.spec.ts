// src/services/addItemToCartService.test.ts
import { describe, it, expect, vi } from 'vitest';
import { AddItemToCartService } from '../add-item-to-cart-service';
import type { CartRepository } from '../../repositories/cart-repository';
import type { CartItem, Product } from '@prisma/client';

describe('AddItemToCartService', () => {
  it('should be able to add a new item to the cart', async () => {
    const mockProduct: Product = {
      id: 'product-1',
      name: 'Test Product',
      price: 100,
      description: 'A test product',
      imageUrl: 'http://exemplo/test-product.png',
    };

    const cartRepository: CartRepository = {
      createCart: async () => null,
      findCartByUserId: async () => null,
      addCartItem: vi.fn(
        async (
          cartId: string,
          productId: string,
          quantity: number,
          price: number
        ) =>
          ({
            id: 'cartItem-1',
            cartId,
            productId,
            quantity,
            price,
          }) as unknown as CartItem
      ),
      updateCartItem: vi.fn(),
      findProductById: vi.fn(async (productId: string) => mockProduct),
      findCartItem: vi.fn(async () => null),
      updateCartTotal: async () => null, // Ajuste conforme necessário
      getCartItems: async () => [], // Ajuste conforme necessário
    };

    const addItemToCartService = new AddItemToCartService(cartRepository);
    const cartItem = await addItemToCartService.addItemToCart(
      'cart-1',
      'product-1',
      2
    );

    expect(cartRepository.findProductById).toHaveBeenCalledWith('product-1');
    expect(cartRepository.addCartItem).toHaveBeenCalledWith(
      'cart-1',
      'product-1',
      2,
      100
    );
    expect(cartItem).toEqual({
      id: 'cartItem-1',
      cartId: 'cart-1',
      productId: 'product-1',
      quantity: 2,
      price: 100,
    });
  });

  it('should update the quantity of an existing cart item', async () => {
    const existingCartItem: CartItem = {
      id: 'cartItem-1',
      cartId: 'cart-1',
      productId: 'product-1',
      quantity: 1,
      unitPrice: 100, // Atualizado para "unitPrice"
    };

    const cartRepository: CartRepository = {
      createCart: async () => null,
      findCartByUserId: async () => null,
      addCartItem: vi.fn(),
      updateCartItem: vi.fn(
        async (cartItemId: string, newQuantity: number) => ({
          ...existingCartItem,
          quantity: newQuantity,
        })
      ),
      findProductById: vi.fn(async (productId: string) => ({
        id: productId,
        name: 'Test Product',
        price: 100,
        description: 'A test product',
        imageUrl: 'http://exemplo/test-product.png',
      })),
      findCartItem: vi.fn(async () => existingCartItem),
      updateCartTotal: async () => null, // Ajuste conforme necessário
      getCartItems: async () => [], // Ajuste conforme necessário
    };

    const addItemToCartService = new AddItemToCartService(cartRepository);
    const updatedCartItem = await addItemToCartService.addItemToCart(
      'cart-1',
      'product-1',
      2
    );

    expect(cartRepository.findProductById).toHaveBeenCalledWith('product-1');
    expect(cartRepository.findCartItem).toHaveBeenCalledWith(
      'cart-1',
      'product-1'
    );
    expect(cartRepository.updateCartItem).toHaveBeenCalledWith('cartItem-1', 3);
    expect(updatedCartItem).toEqual({
      id: 'cartItem-1',
      cartId: 'cart-1',
      productId: 'product-1',
      quantity: 3,
      unitPrice: 100, // Atualizado para "unitPrice"
    });
  });

  it('should throw an error if the product is not found', async () => {
    const cartRepository: CartRepository = {
      createCart: async () => null,
      findCartByUserId: async () => null,
      addCartItem: vi.fn(),
      updateCartItem: vi.fn(),
      findProductById: vi.fn(async () => null),
      findCartItem: vi.fn(async () => null),
      updateCartTotal: async () => null, // Ajuste conforme necessário
      getCartItems: async () => [], // Ajuste conforme necessário
    };

    const addItemToCartService = new AddItemToCartService(cartRepository);

    await expect(
      addItemToCartService.addItemToCart('cart-1', 'product-1', 2)
    ).rejects.toThrow('Product not found');

    expect(cartRepository.findProductById).toHaveBeenCalledWith('product-1');
  });
});
