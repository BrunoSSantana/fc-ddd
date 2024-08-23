import { Order, OrderItem } from "@/domain/checkout/entity";
import type { OrderRepositoryInterface } from "@/domain/checkout/repository/order-repository.interface";
import { prismaService } from "@/infra/libs/prisma/prisma.service";
import type { PrismaClient } from "@prisma/client";

export class OrderRepository implements OrderRepositoryInterface {
  private readonly prismaClient: PrismaClient;
  constructor() {
    this.prismaClient = prismaService.connect();
  }

  async create(entity: Order): Promise<void> {
    const { id: orderId } = await this.prismaClient.order.create({
      data: {
        id: entity.id,
        customerId: entity.customerId,
        total: entity.total(),
      },
    });

    await this.prismaClient.orderItem.createMany({
      data: [
        ...entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          orderId,
          productId: item.productId,
          quantity: item.quantity,
        })),
      ],
    });
  }
  async update(order: Order): Promise<void> {
    await this.prismaClient.order.update({
      where: {
        id: order.id,
      },
      data: {
        customerId: order.customerId,
        total: order.total(),
      },
    });

    await this.prismaClient.$transaction(
      order.items.map((item) => {
        return this.prismaClient.orderItem.upsert({
          where: {
            id: item.id,
          },
          create: {
            id: item.id,
            name: item.name,
            price: item.price,
            orderId: order.id,
            productId: item.productId,
            quantity: item.quantity,
          },
          update: {
            name: item.name,
            price: item.price,
            orderId: order.id,
            productId: item.productId,
            quantity: item.quantity,
          },
        });
      }),
    );
  }
  async find(id: string): Promise<Order> {
    const orderFromDB = await this.prismaClient.order.findUnique({
      where: { id },
      include: {
        items: true,
      },
    });

    if (!orderFromDB) {
      throw new Error("Order not found");
    }

    const orderItems = orderFromDB.items.map(
      (item) =>
        new OrderItem({
          id: item.id,
          name: item.name,
          price: item.price,
          productId: item.productId,
          quantity: item.quantity,
        }),
    );

    const order = new Order({
      id: orderFromDB.id,
      customerId: orderFromDB.customerId,
      items: orderItems,
    });

    return order;
  }
  async findAll(): Promise<Order[]> {
    const orderModels = await this.prismaClient.order.findMany({
      include: {
        items: true,
      },
    });

    const orders = orderModels.map((orderModel) => {
      const orderItems = orderModel.items.map(
        (item) =>
          new OrderItem({
            id: item.id,
            name: item.name,
            price: item.price,
            productId: item.productId,
            quantity: item.quantity,
          }),
      );
      return new Order({
        id: orderModel.id,
        customerId: orderModel.customerId,
        items: orderItems,
      });
    });

    return orders;
  }
}
