import type { Product } from '@prisma/client';
import { prisma } from '../../db';

class ProductRepository {
  async create(
    name: string,
    description: string,
    price: number,
    imageUrl: string
  ) {
    return await prisma.product.create({
      data: {
        name,
        description,
        price,
        imageUrl,
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
}

export { ProductRepository };
