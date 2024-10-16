import type { Product } from '@prisma/client';
import type { ProductRepository } from '../repositories/product-repository';

// Defina os filtros que podem ser aplicados na busca
interface ProductFilters {
  price?: number;
  name?: string;
  type?: string;
}

interface getAllProductsServiceResponse {
  products: Product[];
}

class GetAllProductByFilterService {
  constructor(private productRepository: ProductRepository) {}

  async execute(
    filters: ProductFilters
  ): Promise<getAllProductsServiceResponse> {
    const products = await this.productRepository.findAllProductFilter(filters);

    return { products };
  }
}

export { GetAllProductByFilterService };
