import { z } from 'zod';
import { GetCartController } from '../../controllers/get-cart-cotroller';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import type { FastifyRequest, FastifyReply } from 'fastify';

const getCartParamsSchema = z.object({
  userId: z.string().cuid(),
});

type GetCartRequest = FastifyRequest<{
  Params: z.infer<typeof getCartParamsSchema>;
}>;

export const getCart: FastifyPluginAsyncZod = async app => {
  const getCartController = new GetCartController();

  app.get(
    '/cart/:userId',
    {
      schema: {
        params: getCartParamsSchema,
      },
    },
    async (request: GetCartRequest, reply: FastifyReply) => {
      try {
        const cart = await getCartController.getCart(request, reply);
        reply.code(200).send(cart);
      } catch (error) {
        reply.code(500).send({ error: 'Erro ao obter o carrinho!' });
      }
    }
  );
};
