import type { Product } from '@prisma/client';
import { prisma } from '../../db';

interface ProductFilters {
  price?: number;
  name?: string;
  type?: string;
}

class ProductRepository {
  async create(
    name: string,
    description: string,
    price: number,
    imageUrl: string,
    type: string | undefined
  ): Promise<Product> {
    return await prisma.product.create({
      data: {
        name,
        description,
        price,
        imageUrl,
        type,
      },
    });
  }

  async getAllProducts(): Promise<Product[]> {
    return await prisma.product.findMany();
  }

  async getProductById(product_id: string): Promise<Product | null> {
    return await prisma.product.findUnique({
      where: { id: product_id },
    });
  }

  async deleteProduct(product_id: string): Promise<Product | null> {
    return await prisma.product.delete({
      where: { id: product_id },
    });
  }

  async findAllProductFilter(filter?: ProductFilters): Promise<Product[]> {
    console.log('Filtros recebidos:', filter);

    return prisma.product.findMany({
      where: {
        price: filter?.price ? { lte: filter.price } : undefined, // Preço menor ou igual
        name: filter?.name
          ? { contains: filter.name, mode: 'insensitive' } // Busca insensível a maiúsculas/minúsculas
          : undefined,
        type: filter?.type ? { equals: filter.type } : undefined, // Tipo exato
      },
    });
  }
}

export { ProductRepository };
