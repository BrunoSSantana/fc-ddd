import { productBuilder } from "../data_builder/product";
import { Product } from "../entity/product";
import { ProductService } from "./product.service";

describe("Product service unit tests", () => {
  it("should change the prices of all products", () => {
    const product1Data = productBuilder.withValue("price", 10).build();
    const product2Data = productBuilder.withValue("price", 20).build();
    const product1 = new Product(product1Data);
    const product2 = new Product(product2Data);
    const products = [product1, product2];

    ProductService.increasePrice(products, 100);

    expect(product1.price).toBe(20);
    expect(product2.price).toBe(40);
  });
});
