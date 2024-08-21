import { Customer } from "@/domain/customer/entity";
import type { CustomerRepositoryInterface } from "@/domain/customer/repository";
import { Address } from "@/domain/customer/value-object/address";
import { prismaService } from "@/infra/libs/prisma/prisma.service";
import { PrismaClient } from "@prisma/client";

export class CustomerRepository implements CustomerRepositoryInterface {
  private readonly prismaClient: PrismaClient;
  constructor() {
    this.prismaClient = prismaService.connect();
  }
  async create(entity: Customer): Promise<void> {
    await this.prismaClient.customer.create({
      data: {
        id: entity.id,
        name: entity.name,
        street: entity.Address.street,
        number: entity.Address.number,
        zipCode: entity.Address.zip,
        city: entity.Address.city,
        active: entity.isActive(),
        rewardPoints: entity.rewardPoints,
      },
    });
  }

  async update(entity: Customer): Promise<void> {
    await this.prismaClient.customer.update({
      where: {
        id: entity.id,
      },
      data: {
        name: entity.name,
        street: entity.Address.street,
        number: entity.Address.number,
        zipCode: entity.Address.zip,
        city: entity.Address.city,
        active: entity.isActive(),
        rewardPoints: entity.rewardPoints,
      },
    });
  }

  async find(id: string): Promise<Customer> {
    let customerFromDB;
    try {
      customerFromDB = await this.prismaClient.customer.findUniqueOrThrow({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new Error("Customer not found");
    }

    const customer = new Customer({
      id: customerFromDB.id,
      name: customerFromDB.name,
    });
    const address = new Address({
      street: customerFromDB.street,
      number: customerFromDB.number,
      zip: customerFromDB.zipCode,
      city: customerFromDB.city,
    });
    customer.changeAddress(address);
    return customer;
  }

  async findAll(): Promise<Customer[]> {
    const customerModels = await this.prismaClient.customer.findMany();

    const customers = customerModels.map((customerModels) => {
      const customer = new Customer({
        id: customerModels.id,
        name: customerModels.name,
      });
      customer.addRewardPoints(customerModels.rewardPoints);
      const address = new Address({
        street: customerModels.street,
        number: customerModels.number,
        zip: customerModels.zipCode,
        city: customerModels.city,
      });
      customer.changeAddress(address);
      if (customerModels.active) {
        customer.activate();
      }
      return customer;
    });

    return customers;
  }
}
