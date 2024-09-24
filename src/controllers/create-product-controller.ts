import z from 'zod';
import { ProductRepository } from '../repositories/product-repository';
import type { FastifyRequest, FastifyReply } from 'fastify';

const repository = new ProductRepository();

const productSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.number().positive(),
  imageUrl: z.string().url(),
});

class CreateProductController {
  async createProduct(req: FastifyRequest, res: FastifyReply) {
    try {
      const result = productSchema.parse(req.body);
      const { name, description, price, imageUrl } = result;

      const product = await repository.create(
        name,
        description,
        price,
        imageUrl
      );

      return res.code(201).send(product);
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    } catch (error: any) {
      return res
        .code(400)
        .send({ message: 'Erro ao criar o produto', error: error.message });
    }
  }
}

export { CreateProductController };
