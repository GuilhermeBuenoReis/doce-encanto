import { describe, it, expect, beforeEach, vi } from 'vitest';
import { GetAllProductsService } from '../get-all-products-service';
import type { ProductRepository } from '../../repositories/product-repository';

describe('GetAllProductsService', () => {
  let productRepository: ProductRepository;
  let getAllProductsService: GetAllProductsService;

  beforeEach(() => {
    productRepository = {
      getAllProducts: vi.fn(async () => [
        {
          id: 1,
          name: 'Product 1',
          description: 'Description 1',
          price: 10,
          imageUrl: 'https://example.com/image1.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          name: 'Product 2',
          description: 'Description 2',
          price: 20,
          imageUrl: 'https://example.com/image2.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]),
      create: async (
        name: string,
        description: string,
        price: number,
        imageUrl: string
      ) => ({
        id: 'product-1',
        name,
        description,
        price,
        imageUrl,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
      getProductById: async (id: string) => null,
    } as unknown as ProductRepository;

    getAllProductsService = new GetAllProductsService(productRepository);
  });

  it('should return all products', async () => {
    const response = await getAllProductsService.execute();

    expect(productRepository.getAllProducts).toHaveBeenCalled(); // Verifica se o método foi chamado
    expect(response).toEqual({
      products: [
        {
          id: 1,
          name: 'Product 1',
          description: 'Description 1',
          price: 10,
          imageUrl: 'https://example.com/image1.jpg',
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        },
        {
          id: 2,
          name: 'Product 2',
          description: 'Description 2',
          price: 20,
          imageUrl: 'https://example.com/image2.jpg',
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        },
      ],
    });
  });
});
