import type { FastifyReply, FastifyRequest } from 'fastify';
import { AddItemToCartService } from '../services/add-item-to-cart-service';

export interface AddItemToCartBody {
  cartId: string;
  productId: string;
  quantity: number;
}

export class AddItemToCartController {
  private addItemToCartService = new AddItemToCartService();

  async addItemToCart(
    req: FastifyRequest<{ Body: AddItemToCartBody }>,
    reply: FastifyReply
  ) {
    const { cartId, productId, quantity } = req.body;
    const cartItem = await this.addItemToCartService.addItemToCart(
      cartId,
      productId,
      quantity
    );
    return reply.send(cartItem);
  }
}
