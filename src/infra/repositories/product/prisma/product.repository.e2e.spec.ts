import { productBuilder } from "@/domain/product/data_builder/product";
import { Product } from "@/domain/product/entity/product";
import { prismaService } from "@/infra/libs/prisma/prisma.service";
import { PrismaClient } from "@prisma/client";
import { ProductRepository } from "./product.repository";

describe("Product repository test", () => {
  let prismaClient: PrismaClient;

  beforeAll(async () => {
    prismaClient = prismaService.connect();
    await prismaClient.$connect();
  });

  afterAll(async () => {
    await prismaService.disconnect();
  });

  beforeEach(async () => {
    await prismaClient.$connect();
  });

  afterEach(async () => {
    await prismaClient.orderItem.deleteMany();
    await prismaClient.product.deleteMany();
    await prismaClient.$disconnect();
  });

  it("should create a product", async () => {
    const productRepository = new ProductRepository();
    const productData = productBuilder.build();
    const product = new Product(productData);

    await productRepository.create(product);

    const productFromDB = await prismaClient.product.findUnique({
      where: { id: product.id },
    });

    expect(productFromDB).toStrictEqual({
      id: product.id,
      name: product.name,
      price: product.price,
    });
  });

  it("should update a product", async () => {
    const productRepository = new ProductRepository();
    const productData = productBuilder.build();
    const product = new Product(productData);

    await productRepository.create(product);

    const productFromDB = await prismaClient.product.findUnique({
      where: { id: product.id },
    });

    expect(productFromDB).toStrictEqual({
      id: product.id,
      name: product.name,
      price: product.price,
    });

    product.changeName("Product 2");
    product.changePrice(200);

    await productRepository.update(product);

    const productFromDB2 = await prismaClient.product.findUnique({
      where: { id: product.id },
    });

    expect(productFromDB2).toStrictEqual({
      id: product.id,
      name: "Product 2",
      price: 200,
    });
  });

  it("should find a product", async () => {
    const productRepository = new ProductRepository();
    const productData = productBuilder.build();
    const product = new Product(productData);

    await productRepository.create(product);

    const productFromDB = await prismaClient.product.findUnique({
      where: { id: product.id },
    });

    const foundProduct = await productRepository.find(product.id);

    expect(productFromDB).toStrictEqual({
      id: foundProduct.id,
      name: foundProduct.name,
      price: foundProduct.price,
    });
  });

  it("should find all products", async () => {
    const productRepository = new ProductRepository();
    const productData = productBuilder.build();
    const product = new Product(productData);
    await productRepository.create(product);

    const productData2 = productBuilder.build();
    const product2 = new Product(productData2);
    await productRepository.create(product2);

    const foundProducts = await productRepository.findAll();
    const products = [product, product2];

    expect(products).toEqual(foundProducts);
  });
});
