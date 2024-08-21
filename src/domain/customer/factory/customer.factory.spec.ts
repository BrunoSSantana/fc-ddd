import { addressBuilder } from "@/domain/customer/data-builder/customer";
import { CustomerFactory } from "@/domain/customer/factory/customer.factory";
import { Address } from "@/domain/customer/value-object/address";

describe("Customer factory unit test", () => {
  it("should create a customer", () => {
    const customer = CustomerFactory.create("John");

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("John");
    expect(customer.Address).toBeUndefined();
  });

  it("should create a customer with an address", () => {
    const addressData = addressBuilder.build();
    const address = new Address(addressData);

    const customer = CustomerFactory.createWithAddress("John", address);

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("John");
    expect(customer.Address).toBe(address);
  });
});
