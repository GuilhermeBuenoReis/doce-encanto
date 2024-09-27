// src/services/getCartService.ts
import { CartRepository } from '../repositories/cart-repository';
import type { Cart } from '@prisma/client';

export class GetCartService {
  private cartRepository = new CartRepository();

  async getCart(userId: string): Promise<Cart | null> {
    return this.cartRepository.findCartByUserId(userId);
  }
}
