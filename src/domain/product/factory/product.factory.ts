import { randomUUID as uuid } from "node:crypto";
import { Product } from "../entity/product";
import { ProductB } from "../entity/product-b";
import type { ProductInterface } from "../entity/product.interface";

export class ProductFactory {
  public static create(
    type: string,
    name: string,
    price: number,
  ): ProductInterface {
    switch (type) {
      case "a":
        return new Product({ id: uuid(), name, price });
      case "b":
        return new ProductB({ id: uuid(), name, price });
      default:
        throw new Error("Product type not supported");
    }
  }
}
