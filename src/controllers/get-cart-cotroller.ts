// src/controllers/getCartController.ts
import type { FastifyReply, FastifyRequest } from 'fastify';
import { GetCartService } from '../services/get-cart-service';

export interface GetCartParams {
  userId: string;
}

export class GetCartController {
  private getCartService = new GetCartService();

  async getCart(
    req: FastifyRequest<{ Params: GetCartParams }>,
    reply: FastifyReply
  ) {
    const { userId } = req.params;
    const cart = await this.getCartService.getCart(userId);
    return reply.send(cart);
  }
}
