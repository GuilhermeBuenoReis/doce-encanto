import type { Product } from '@prisma/client';
import type { ProductRepository } from '../repositories/product-repository';

interface getAllProductsServiceResponse {
  products: Product[];
}

class GetAllProductsService {
  constructor(private productRepository: ProductRepository) {}

  async execute(): Promise<getAllProductsServiceResponse> {
    const products = await this.productRepository.getAllProducts(); // Sem passar o product_id

    return { products };
  }
}

export { GetAllProductsService };
