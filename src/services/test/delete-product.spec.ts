import { describe, it, expect } from 'vitest';
import { DeleteProductService } from '../delete-product-service';
import type { Product } from '@prisma/client';
import type { ProductRepository } from '../../repositories/product-repository';

const mockProduct: Product = {
  id: 'product-1',
  name: 'Produto Teste',
  description: 'Descrição do produto teste',
  price: 100.0,
  imageUrl: 'https://example.com/produto.jpg',
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('DeleteProductService', () => {
  it('should be able to delete a product', async () => {
    const productRepository: ProductRepository = {
      create: async (
        name: string,
        description: string,
        price: number,
        imageUrl: string
      ) => mockProduct,
      getAllProducts: async () => [],

      getProductById: async (id: string) => null,

      deleteProduct: async (product_id: string): Promise<Product | null> => {
        return product_id === mockProduct.id ? mockProduct : null;
      },
    };

    const deleteProductService = new DeleteProductService(productRepository);

    const result = await deleteProductService.execute({
      product_id: 'product-1',
    });

    expect(result.product).toEqual(mockProduct);
  });

  it('should throw an error if product not found', async () => {
    const productRepository: ProductRepository = {
      create: async (
        name: string,
        description: string,
        price: number,
        imageUrl: string
      ) => mockProduct,
      getAllProducts: async () => [],
      getProductById: async (id: string) => null,
      deleteProduct: async (product_id: string): Promise<Product | null> => {
        return null;
      },
    };

    const deleteProductService = new DeleteProductService(productRepository);

    await expect(
      deleteProductService.execute({ product_id: 'non-existent-id' })
    ).rejects.toThrowError('Produto não encontrado');
  });
});
