// src/repositories/cartRepository.ts
import { PrismaClient } from '@prisma/client';
import type { CartItem, Cart } from '@prisma/client';

const prisma = new PrismaClient();

export class CartRepository {
  async findCartByUserId(userId: string): Promise<Cart | null> {
    return prisma.cart.findFirst({
      where: { userId, status: 'active' },
      include: {
        cartItems: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  async createCart(userId: string): Promise<Cart> {
    return prisma.cart.create({
      data: {
        userId,
      },
    });
  }

  async findProductById(productId: string) {
    return prisma.product.findUnique({
      where: { id: productId },
    });
  }

  async findCartItem(
    cartId: string,
    productId: string
  ): Promise<CartItem | null> {
    return prisma.cartItem.findFirst({
      where: { cartId, productId },
    });
  }

  async addCartItem(
    cartId: string,
    productId: string,
    quantity: number,
    unitPrice: number
  ): Promise<CartItem> {
    return prisma.cartItem.create({
      data: {
        cartId,
        productId,
        quantity,
        unitPrice,
      },
    });
  }

  async updateCartItem(
    cartItemId: string,
    quantity: number
  ): Promise<CartItem> {
    return prisma.cartItem.update({
      where: { id: cartItemId },
      data: { quantity },
    });
  }

  async updateCartTotal(cartId: string, totalPrice: number): Promise<Cart> {
    return prisma.cart.update({
      where: { id: cartId },
      data: { totalPrice },
    });
  }

  async getCartItems(cartId: string) {
    return prisma.cartItem.findMany({
      where: { cartId },
    });
  }
}
