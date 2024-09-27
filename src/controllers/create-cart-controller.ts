import type { FastifyReply, FastifyRequest } from 'fastify';
import { CreateCartService } from '../services/create-cart-service';

export class CreateCartController {
  private createCartService = new CreateCartService();

  async createCart(
    req: FastifyRequest<{ Body: { userId: string } }>, // Usar Body em vez de Params
    reply: FastifyReply
  ) {
    const { userId } = req.body; // Obter userId do corpo da requisição

    try {
      const cart = await this.createCartService.createCart(userId);
      return reply.status(201).send(cart);
    } catch (error) {
      return reply.status(500).send({ error: 'Erro ao criar o carrinho!' });
    }
  }
}
