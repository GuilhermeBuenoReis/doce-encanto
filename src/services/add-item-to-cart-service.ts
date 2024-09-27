// src/services/addItemToCartService.ts
import { CartRepository } from '../repositories/cart-repository';
import type { CartItem } from '@prisma/client';

export class AddItemToCartService {
  private cartRepository = new CartRepository();

  async addItemToCart(
    cartId: string,
    productId: string,
    quantity: number
  ): Promise<CartItem | null> {
    const product = await this.cartRepository.findProductById(productId);
    if (!product) throw new Error('Product not found');

    const cartItem = await this.cartRepository.findCartItem(cartId, productId);

    if (cartItem) {
      return this.cartRepository.updateCartItem(
        cartItem.id,
        cartItem.quantity + quantity
      );
    }
    return this.cartRepository.addCartItem(
      cartId,
      productId,
      quantity,
      product.price
    );
  }
}
