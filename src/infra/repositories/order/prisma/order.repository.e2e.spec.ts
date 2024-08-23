import {
  orderBuilder,
  orderItemBuilder,
} from "@/domain/checkout/data_builder/order";
import { Order, OrderItem } from "@/domain/checkout/entity";
import {
  addressBuilder,
  customerBuilder,
} from "@/domain/customer/data_builder/customer";
import { Customer } from "@/domain/customer/entity";
import { Address } from "@/domain/customer/value-object/address";
import { productBuilder } from "@/domain/product/data_builder/product";
import { Product } from "@/domain/product/entity";
import { prismaService } from "@/infra/libs/prisma/prisma.service";
import { CustomerRepository } from "@/infra/repositories/customer/prisma";
import { OrderRepository } from "@/infra/repositories/order/prisma";
import { ProductRepository } from "@/infra/repositories/product/prisma";
import type { PrismaClient } from "@prisma/client";

describe("Order repository test", () => {
  let prismaClient: PrismaClient;

  beforeAll(async () => {
    prismaClient = prismaService.connect();
  });

  afterAll(async () => {
    await prismaService.disconnect();
  });

  beforeEach(async () => {
    await prismaClient.$connect();
  });

  afterEach(async () => {
    await prismaService.disconnect();
  });

  it("should create a new order", async () => {
    const customerData = customerBuilder.build();
    const addressData = addressBuilder.build();

    const customer = new Customer(customerData);
    const address = new Address(addressData);

    customer.changeAddress(address);

    const customerRepository = new CustomerRepository();
    await customerRepository.create(customer);

    const productData = productBuilder.build();
    const product = new Product(productData);

    const productRepository = new ProductRepository();
    await productRepository.create(product);

    const orderItemData = orderItemBuilder
      .withValue("productId", product.id)
      .build();
    const orderItem = new OrderItem(orderItemData);

    const orderData = orderBuilder
      .withValue("customerId", customer.id)
      .withValue("items", [orderItem])
      .build();
    const order = new Order(orderData);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderFromDB = await prismaClient.order.findUnique({
      where: { id: order.id },
      include: { items: true },
    });

    expect(orderFromDB).toStrictEqual({
      id: order.id,
      customerId: customer.id,
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          orderId: order.id,
          productId: product.id,
        },
      ],
    });
  });

  it("should update a order", async () => {
    const customerData = customerBuilder.build();
    const addressData = addressBuilder.build();

    const customer = new Customer(customerData);
    const address = new Address(addressData);

    customer.changeAddress(address);

    const customerRepository = new CustomerRepository();
    await customerRepository.create(customer);

    const productData = productBuilder.build();
    const product = new Product(productData);

    const productRepository = new ProductRepository();
    await productRepository.create(product);

    const orderItemData = orderItemBuilder
      .withValue("productId", product.id)
      .build();
    const orderItem = new OrderItem(orderItemData);

    const orderData = orderBuilder
      .withValue("customerId", customer.id)
      .withValue("items", [orderItem])
      .build();
    const order = new Order(orderData);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    let orderFromDB = await prismaClient.order.findUnique({
      where: { id: order.id },
      include: { items: true },
    });

    // update order
    const newOrderItemData = orderItemBuilder
      .withValue("productId", product.id)
      .build();
    const newOrderItem = new OrderItem(newOrderItemData);

    order.addItem(newOrderItem);
    await orderRepository.update(order);

    orderFromDB = await prismaClient.order.findUnique({
      where: { id: order.id },
      include: { items: true },
    });

    expect(orderFromDB).toStrictEqual({
      id: order.id,
      customerId: customer.id,
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          orderId: order.id,
          productId: product.id,
        },
        {
          id: newOrderItem.id,
          name: newOrderItem.name,
          price: newOrderItem.price,
          quantity: newOrderItem.quantity,
          orderId: order.id,
          productId: product.id,
        },
      ],
    });
  });

  it("should find a order", async () => {
    const customerData = customerBuilder.build();
    const addressData = addressBuilder.build();

    const customer = new Customer(customerData);
    const address = new Address(addressData);

    customer.changeAddress(address);

    const customerRepository = new CustomerRepository();
    await customerRepository.create(customer);

    const productData = productBuilder.build();
    const product = new Product(productData);

    const productRepository = new ProductRepository();
    await productRepository.create(product);

    const orderItemData = orderItemBuilder
      .withValue("productId", product.id)
      .build();
    const orderItem = new OrderItem(orderItemData);

    const orderData = orderBuilder
      .withValue("customerId", customer.id)
      .withValue("items", [orderItem])
      .build();
    const order = new Order(orderData);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderFromDB = await orderRepository.find(order.id);

    expect(orderFromDB).toStrictEqual(order);
  });

  it("should find all orders", async () => {
    await prismaClient.orderItem.deleteMany();
    await prismaClient.order.deleteMany();
    const customerData = customerBuilder.build();
    const addressData = addressBuilder.build();

    const customer = new Customer(customerData);
    const address = new Address(addressData);

    customer.changeAddress(address);

    const customerRepository = new CustomerRepository();
    await customerRepository.create(customer);

    const productData = productBuilder.build();
    const product = new Product(productData);

    const productRepository = new ProductRepository();
    await productRepository.create(product);

    const orderRepository = new OrderRepository();
    const orders = new Array<Order>();

    for (let i = 0; i < 4; i++) {
      const orderItemData = orderItemBuilder
        .withValue("productId", product.id)
        .build();
      const orderItem = new OrderItem(orderItemData);

      const orderData = orderBuilder
        .withValue("customerId", customer.id)
        .withValue("items", [orderItem])
        .build();
      const order = new Order(orderData);

      orders.push(order);

      await orderRepository.create(order);
    }

    const ordersFromDB = await orderRepository.findAll();

    expect(ordersFromDB.length).toBe(4);
  });
});
