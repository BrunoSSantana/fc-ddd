import { addressBuilder, customerBuilder } from "../data-builder/customer";
import { Address } from "../value-object/address";
import { Customer } from "./customer";

describe("Customer unit tests", () => {
  it("should throw error when id is empty", () => {
    const customerData = customerBuilder.withValue("id", "").build();
    expect(() => {
      const customer = new Customer(customerData);
    }).toThrowError("Id is required");
  });

  it("should throw error when name is empty", () => {
    const customerData = customerBuilder.withValue("name", "").build();

    expect(() => {
      const customer = new Customer(customerData);
    }).toThrowError("Name is required");
  });

  it("should change name", () => {
    const customerData = customerBuilder.build();
    // Arrange
    const customer = new Customer(customerData);

    // Act
    customer.changeName("Jane");

    // Assert
    expect(customer.name).toBe("Jane");
  });

  it("should activate customer", () => {
    const customerData = customerBuilder.build();
    const addressData = addressBuilder.build();

    const customer = new Customer(customerData);
    const address = new Address(addressData);
    customer.changeAddress(address);

    customer.activate();

    expect(customer.isActive()).toBe(true);
  });

  it("should throw error when address is undefined when you activate a customer", () => {
    const customerData = customerBuilder.build();

    expect(() => {
      const customer = new Customer(customerData);
      customer.activate();
    }).toThrowError("Address is mandatory to activate a customer");
  });

  it("should deactivate customer", () => {
    const customerData = customerBuilder.build();

    const customer = new Customer(customerData);

    customer.deactivate();

    expect(customer.isActive()).toBe(false);
  });

  it("should add reward points", () => {
    const customerData = customerBuilder.build();

    const customer = new Customer(customerData);
    expect(customer.rewardPoints).toBe(0);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(10);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(20);
  });
});
