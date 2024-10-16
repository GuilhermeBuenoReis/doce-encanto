import type { Product } from '@prisma/client';
import type { ProductRepository } from '../repositories/product-repository';

interface ProductServiceRequest {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  type?: string;
}

interface ProductServiceResponse {
  product: Product;
}

export class CreateProductService {
  constructor(private productsRepository: ProductRepository) {}

  async execute({
    name,
    price,
    description,
    imageUrl,
    type,
  }: ProductServiceRequest): Promise<ProductServiceResponse> {
    const product = await this.productsRepository.create(
      name,
      description,
      price,
      imageUrl,
      type
    );

    return { product };
  }
}
