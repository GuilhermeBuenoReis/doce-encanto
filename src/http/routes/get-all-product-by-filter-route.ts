import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { GetAllProductByFilterController } from '../../controllers/get-all-product-by-filter';
import { GetAllProductByFilterService } from '../../services/get-all-product-by-filter';
import { ProductRepository } from '../../repositories/product-repository';

const repository = new ProductRepository();
const service = new GetAllProductByFilterService(repository);

export const getAllProductsByFilterRouter: FastifyPluginAsyncZod =
  async app => {
    const getAllProductsController = new GetAllProductByFilterController(
      service
    );

    app.get<{ Querystring: { price?: number; name?: string; type?: string } }>(
      '/filter',
      async (request, reply) => {
        try {
          const products = await getAllProductsController.getAllProducts(
            request,
            reply
          );

          reply.code(200).send(products);
        } catch (error) {
          reply
            .code(500)
            .send({ error: 'Erro ao listar os produtos filtrados.' });
        }
      }
    );
  };
