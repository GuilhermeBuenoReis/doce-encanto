import { z } from 'zod';
import { CreateCartController } from '../../controllers/create-cart-controller';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import type { FastifyRequest, FastifyReply } from 'fastify';

const createCartSchema = z.object({
  userId: z.string().cuid(), // Assumindo que userId é um CUID
});

type CreateCartRequest = FastifyRequest<{
  Body: z.infer<typeof createCartSchema>;
}>;

export const createCart: FastifyPluginAsyncZod = async app => {
  const createCartController = new CreateCartController();

  app.post(
    '/cart/create',
    {
      schema: {
        body: createCartSchema,
      },
    },
    async (request: CreateCartRequest, reply: FastifyReply) => {
      try {
        const cart = await createCartController.createCart(request, reply);
        reply.code(201).send(cart);
      } catch (error) {
        reply.code(500).send({ error: 'Erro ao criar o carrinho!' });
      }
    }
  );
};
