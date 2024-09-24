import type { Product } from '@prisma/client';
import type { ProductRepository } from '../repositories/product-repository';

interface ProductServiceRequest {
  product_id: string;
}

interface ProductServiceResponse {
  product: Product | null;
}

export class DeleteProductService {
  constructor(private productRepository: ProductRepository) {}

  async execute({
    product_id,
  }: ProductServiceRequest): Promise<ProductServiceResponse> {
    const product = await this.productRepository.deleteProduct(product_id);

    if (!product) {
      throw new Error('Produto não encontrado');
    }

    return { product };
  }
}
