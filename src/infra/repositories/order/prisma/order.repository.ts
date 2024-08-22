import type { Order } from "@/domain/checkout/entity";
import { prismaService } from "@/infra/libs/prisma/prisma.service";
import type { PrismaClient } from "@prisma/client";

export class OrderRepository {
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
}
