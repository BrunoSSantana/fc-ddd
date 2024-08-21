import {
  addressBuilder,
  customerBuilder,
} from "@/domain/customer/data_builder/customer";
import { Customer } from "@/domain/customer/entity";
import { Address } from "@/domain/customer/value-object/address";
import { PrismaClient } from "@prisma/client";
import { CustomerRepository } from "./customer.repository";

describe("Customer repository test", () => {
  let prismaClient: PrismaClient;

  beforeEach(async () => {
    prismaClient = new PrismaClient();
    await prismaClient.$connect();
  });

  afterEach(async () => {
    await prismaClient.customer.deleteMany();
    await prismaClient.$disconnect();
  });

  it("should create a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customerData = customerBuilder.build();
    const customer = new Customer(customerData);
    const addressData = addressBuilder.build();
    const address = new Address(addressData);
    customer.Address = address;
    await customerRepository.create(customer);

    const customerFromDB = await prismaClient.customer.findUnique({
      where: { id: customer.id },
    });

    expect(customerFromDB).toStrictEqual({
      id: customer.id,
      name: customer.name,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
      street: address.street,
      number: address.number,
      zipCode: address.zip,
      city: address.city,
    });
  });

  it("should update a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customerData = customerBuilder.build();
    const customer = new Customer(customerData);
    const addressData = addressBuilder.build();
    const address = new Address(addressData);
    customer.Address = address;
    await customerRepository.create(customer);

    customer.changeName("Customer 2");
    await customerRepository.update(customer);
    const customerFromDB = await prismaClient.customer.findUnique({
      where: { id: customer.id },
    });

    expect(customerFromDB).toStrictEqual({
      id: customer.id,
      name: customer.name,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
      street: address.street,
      number: address.number,
      zipCode: address.zip,
      city: address.city,
    });
  });

  it("should find a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customerData = customerBuilder.build();
    const addressData = addressBuilder.build();
    const customer = new Customer(customerData);
    const address = new Address(addressData);
    customer.Address = address;
    await customerRepository.create(customer);

    const customerResult = await customerRepository.find(customer.id);

    expect(customer).toStrictEqual(customerResult);
  });

  it("should throw an error when customer is not found", async () => {
    const customerRepository = new CustomerRepository();

    expect(async () => {
      await customerRepository.find("456ABC");
    }).rejects.toThrow("Customer not found");
  });

  it("should find all customers", async () => {
    const customerRepository = new CustomerRepository();
    const customerData = customerBuilder.build();
    const addressData = addressBuilder.build();
    const customer1 = new Customer(customerData);
    const address1 = new Address(addressData);
    customer1.Address = address1;
    customer1.addRewardPoints(10);
    customer1.activate();

    const customer2 = new Customer(customerBuilder.build());
    const address2 = new Address(addressBuilder.build());
    customer2.Address = address2;
    customer2.addRewardPoints(20);

    await customerRepository.create(customer1);
    await customerRepository.create(customer2);

    const customers = await customerRepository.findAll();

    expect(customers).toHaveLength(2);
    expect(customers).toContainEqual(customer1);
    expect(customers).toContainEqual(customer2);
  });
});
