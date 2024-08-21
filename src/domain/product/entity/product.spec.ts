import { productBuilder } from "../data_builder/product";
import { Product } from "./product";

describe("Product unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      const productData = productBuilder.withValue("id", "").build();
      const product = new Product(productData);
    }).toThrowError("Id is required");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      const productData = productBuilder.withValue("name", "").build();
      const product = new Product(productData);
    }).toThrowError("Name is required");
  });

  it("should throw error when price is less than zero", () => {
    expect(() => {
      const productData = productBuilder.withValue("price", -1).build();
      const product = new Product(productData);
    }).toThrowError("Price must be greater than zero");
  });

  it("should change name", () => {
    const productData = productBuilder.build();
    const product = new Product(productData);
    product.changeName("Product 2");
    expect(product.name).toBe("Product 2");
  });

  it("should change price", () => {
    const productData = productBuilder.build();
    const product = new Product(productData);
    product.changePrice(150);
    expect(product.price).toBe(150);
  });
});
