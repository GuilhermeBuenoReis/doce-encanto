// src/services/createCartService.ts
import { CartRepository } from '../repositories/cart-repository';
import type { Cart } from '@prisma/client';

export class CreateCartService {
  private cartRepository = new CartRepository();

  async createCart(userId: string): Promise<Cart> {
    return this.cartRepository.createCart(userId);
  }
}
