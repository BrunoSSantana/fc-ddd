import { Product } from "@/domain/product/entity/product";
import type { ProductRepositoryInterface } from "@/domain/product/repository/product-repository.interface";
import { prismaService } from "@/infra/libs/prisma/prisma.service";
import type { PrismaClient } from "@prisma/client";

export class ProductRepository implements ProductRepositoryInterface {
  private readonly prismaClient: PrismaClient;
  constructor() {
    this.prismaClient = prismaService.connect();
  }
  async create(entity: Product): Promise<void> {
    await this.prismaClient.product.create({
      data: {
        id: entity.id,
        name: entity.name,
        price: entity.price,
      },
    });
  }

  async update(entity: Product): Promise<void> {
    await this.prismaClient.product.update({
      where: {
        id: entity.id,
      },
      data: {
        name: entity.name,
        price: entity.price,
      },
    });
  }

  async find(id: string): Promise<Product> {
    const productFromDB = await this.prismaClient.product.findUnique({
      where: { id },
    });

    if (!productFromDB) {
      throw new Error("Product not found");
    }

    return new Product({
      id: productFromDB.id,
      name: productFromDB.name,
      price: productFromDB.price,
    });
  }

  async findAll(): Promise<Product[]> {
    const productModels = await this.prismaClient.product.findMany();
    return productModels.map(
      (productModel) =>
        new Product({
          id: productModel.id,
          name: productModel.name,
          price: productModel.price,
        }),
    );
  }
}
