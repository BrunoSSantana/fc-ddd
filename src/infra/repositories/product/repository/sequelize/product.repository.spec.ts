import { PrismaClient } from "@prisma/client";
import { ProductRepository } from "./product.repository";
import { Product } from "@/domain/product/entity/product";

describe("Product repository test", () => {
  let prismaClient: PrismaClient;

  beforeEach(async () => {
    prismaClient = new PrismaClient();
    await prismaClient.$connect();
  });

  afterEach(async () => {
    await prismaClient.$disconnect();
  });

  it("should create a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 100);

    await productRepository.create(product);

    const productModel = await prismaClient.product.findUnique({ where: { id: "1" } });

    expect(productModel).toStrictEqual({
      id: "1",
      name: "Product 1",
      price: 100,
    });
  });

  it("should update a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 100);

    await productRepository.create(product);

    const productModel = await prismaClient.product.findUnique({ where: { id: "1" } });

    expect(productModel).toStrictEqual({
      id: "1",
      name: "Product 1",
      price: 100,
    });

    product.changeName("Product 2");
    product.changePrice(200);

    await productRepository.update(product);

    const productModel2 = await prismaClient.product.findUnique({ where: { id: "1" } });

    expect(productModel2).toStrictEqual({
      id: "1",
      name: "Product 2",
      price: 200,
    });
  });

  it("should find a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 100);

    await productRepository.create(product);

    const productModel = await prismaClient.product.findUnique({ where: { id: "1" } });

    const foundProduct = await productRepository.find("1");

    expect(productModel).toStrictEqual({
      id: foundProduct.id,
      name: foundProduct.name,
      price: foundProduct.price,
    });
  });

  it("should find all products", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 100);
    await productRepository.create(product);

    const product2 = new Product("2", "Product 2", 200);
    await productRepository.create(product2);

    const foundProducts = await productRepository.findAll();
    const products = [product, product2];

    expect(products).toEqual(foundProducts);
  });
});
