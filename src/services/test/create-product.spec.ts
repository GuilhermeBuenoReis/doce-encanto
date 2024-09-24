import { describe, it, expect } from 'vitest';
import { CreateProductService } from '../create-product-service';
import type { ProductRepository } from '../../repositories/product-repository';
import type { Product } from '@prisma/client';

describe('CreateProductService', () => {
  it('should be able to create a product', async () => {
    const productRepository: ProductRepository = {
      create: async (
        name: string,
        description: string,
        price: number,
        imageUrl: string
      ) => {
        return {
          id: 'product-1',
          name,
          description,
          price,
          imageUrl,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      },
      getAllProducts: async () => [], // Implementando os métodos obrigatórios
      getProductById: async (id: string) => null,
      deleteProduct: (product_id: string): Promise<Product | null> => {
        throw new Error('Function not implemented.');
      },
    };

    const createProductService = new CreateProductService(productRepository);

    const { product } = await createProductService.execute({
      name: 'Doce-1',
      description: 'Delicia de doce',
      price: 10.99,
      imageUrl: 'https://example.com/image.jpg',
    });

    expect(product.id).toEqual(expect.any(String));
  });
});
