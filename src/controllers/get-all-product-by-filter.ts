import type { FastifyReply, FastifyRequest } from 'fastify';
import type { GetAllProductByFilterService } from '../services/get-all-product-by-filter';

interface GetAllProductsRequestQuery {
  price?: number;
  name?: string;
  type?: string;
}

type GetAllProductsByFilterRequest = FastifyRequest<{
  Querystring: GetAllProductsRequestQuery;
}>;

export class GetAllProductByFilterController {
  constructor(
    private getAllProductByFilterService: GetAllProductByFilterService
  ) {}

  async getAllProducts(req: GetAllProductsByFilterRequest, res: FastifyReply) {
    try {
      const { price, name, type } = req.query;

      const result = await this.getAllProductByFilterService.execute({
        price,
        name,
        type,
      });

      return res.code(200).send(result);
    } catch (error) {
      return res.code(500).send({ error: 'Falha ao filtrar.' });
    }
  }
}
