import type { FastifyReply, FastifyRequest } from 'fastify';
import { GetAllProductsService } from '../services/get-all-products-service';
import { ProductRepository } from '../repositories/product-repository';

const repository = new ProductRepository();
const service = new GetAllProductsService(repository);

export class GetAllProductsController {
  async getAllProducts(req: FastifyRequest, res: FastifyReply) {
    try {
      const { products } = await service.execute();

      if (!products || products.length === 0) {
        return res.status(404).send({ error: 'Nenhum produto encontrado.' });
      }

      return res.status(200).send(products); // Retorna todos os produtos
    } catch (error) {
      return res.status(500).send({ error: 'Erro ao buscar produtos.' });
    }
  }
}
