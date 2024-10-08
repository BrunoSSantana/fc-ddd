import { randomUUID as uuid } from "node:crypto";
import type { Customer } from "@/domain/customer/entity";
import { Order } from "../entity/order";
import type { OrderItem } from "../entity/order_item";

export class OrderService {
  static placeOrder(customer: Customer, items: OrderItem[]): Order {
    if (items.length === 0) {
      throw new Error("Order must have at least one item");
    }
    const order = new Order({ id: uuid(), customerId: customer.id, items });
    customer.addRewardPoints(order.total() / 2);
    return order;
  }

  static total(orders: Order[]): number {
    return orders.reduce((acc, order) => acc + order.total(), 0);
  }
}
