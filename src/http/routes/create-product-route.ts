import { z } from 'zod';
import { UserController } from '../../controllers/user-controller';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { CreateProductController } from '../../controllers/create-product-controller';

const productSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.number().positive(),
  imageUrl: z.string().url(),
});

export const createProduct: FastifyPluginAsyncZod = async app => {
  const createProduct = new CreateProductController();

  app.post(
    '/products/create',
    {
      schema: {
        body: productSchema,
      },
    },
    async (request, reply) => {
      try {
        const product = await createProduct.createProduct(request, reply);

        reply.code(201).send(product);
      } catch (error) {
        reply.code(500).send({ error: 'Erro ao cadastrar novo produto!' }); // Tratamento de erro
      }
    }
  );
};
