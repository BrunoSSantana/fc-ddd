import { randomUUID as uuid } from "node:crypto";
import { Customer } from "../entity";
import type { Address } from "../value-object/address";

export class CustomerFactory {
  public static create(name: string): Customer {
    return new Customer({
      id: uuid(),
      name,
    });
  }

  public static createWithAddress(name: string, address: Address): Customer {
    const customer = new Customer({
      id: uuid(),
      name,
    });
    customer.changeAddress(address);
    return customer;
  }
}
