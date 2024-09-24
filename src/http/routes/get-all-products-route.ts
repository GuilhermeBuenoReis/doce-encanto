import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { GetAllProductsController } from '../../controllers/get-all-products-controller';

export const getAllProducts: FastifyPluginAsyncZod = async app => {
  const getAllProducts = new GetAllProductsController();

  app.get('/products', async (request, reply) => {
    try {
      const products = await getAllProducts.getAllProducts(request, reply);

      reply.code(201).send(products);
    } catch (error) {
      reply.code(500).send({ error: 'Erro ao listar os produtos cadastrados' }); // Tratamento de erro
    }
  });
};
