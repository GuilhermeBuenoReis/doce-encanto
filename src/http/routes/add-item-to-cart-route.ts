import { z } from 'zod';
import { AddItemToCartController } from '../../controllers/add-item-to-cart-controller';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import type { FastifyRequest, FastifyReply } from 'fastify';

const addItemToCartSchema = z.object({
  cartId: z.string().cuid(),
  productId: z.string().cuid(),
  quantity: z.number().min(1),
});

type AddItemToCartRequest = FastifyRequest<{
  Body: z.infer<typeof addItemToCartSchema>;
}>;

export const addItemToCart: FastifyPluginAsyncZod = async app => {
  const addItemToCartController = new AddItemToCartController();

  app.post(
    '/cart/add-item',
    {
      schema: {
        body: addItemToCartSchema,
      },
    },
    async (request: AddItemToCartRequest, reply: FastifyReply) => {
      try {
        const cartItem = await addItemToCartController.addItemToCart(
          request,
          reply
        );
        reply.code(201).send(`Seu carrinho é: ${cartItem}`);
      } catch (error) {
        reply.code(500).send({ error: 'Erro ao adicionar item ao carrinho!' });
      }
    }
  );
};
