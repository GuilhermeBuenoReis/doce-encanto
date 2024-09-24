import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { DeleteProductController } from '../../controllers/delete-product-controller';
import { z } from 'zod';

export const deleteProductSchema = z.object({
  product_id: z.string().cuid2(),
});

export type DeleteProductParams = z.infer<typeof deleteProductSchema>;

export const deleteProductRouter: FastifyPluginAsyncZod = async app => {
  const deleteProductController = new DeleteProductController();

  app.delete<{
    Params: DeleteProductParams;
  }>(
    '/products/:product_id',
    {
      schema: {
        params: deleteProductSchema,
      },
    },
    async (request, reply) => {
      try {
        await deleteProductController.deleteProduct(request, reply);
        reply.code(204).send('Produto excluído com sucesso.');
      } catch (error) {
        reply.code(500).send({ error: 'Erro ao excluir o produto' });
      }
    }
  );
};
