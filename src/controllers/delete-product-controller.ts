import type { FastifyReply, FastifyRequest } from 'fastify';
import { ProductRepository } from '../repositories/product-repository';
import { DeleteProductService } from '../services/delete-product-service';

const repository = new ProductRepository();
const service = new DeleteProductService(repository);

interface DeleteProductParams {
  product_id: string;
}

export class DeleteProductController {
  async deleteProduct(
    req: FastifyRequest<{ Params: DeleteProductParams }>, // Tipar os parâmetros da requisição
    res: FastifyReply
  ) {
    try {
      const { product_id } = req.params; // O TypeScript agora sabe que `product_id` está presente

      // Execute a lógica de deleção do produto
      await service.execute({ product_id });

      return res.status(204).send(); // Status 204 (No Content)
    } catch (error) {
      return res.status(500).send({ error: 'Erro ao excluir o produto' });
    }
  }
}
