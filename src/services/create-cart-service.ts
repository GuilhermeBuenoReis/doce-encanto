// src/services/createCartService.ts
import type { CartRepository } from '../repositories/cart-repository';
import type { Cart } from '@prisma/client';

export class CreateCartService {
  constructor(private cartRepository: CartRepository) {}

  async createCart(userId: string): Promise<Cart> {
    return this.cartRepository.createCart(userId);
  }
}
