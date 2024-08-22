import { customerBuilder } from "@/domain/customer/data_builder/customer";
import { Customer } from "@/domain/customer/entity";
import { orderBuilder, orderItemBuilder } from "../data_builder/order";
import { Order, OrderItem } from "../entity";
import { OrderService } from "./order.service";

describe("Order service unit tets", () => {
  it("should place an order", () => {
    const customerData = customerBuilder.build();

    const customer = new Customer(customerData);
    const orderItemData = orderItemBuilder
      .withValue("price", 10)
      .withValue("quantity", 1)
      .build();
    const item = new OrderItem(orderItemData);

    const order = OrderService.placeOrder(customer, [item]);

    expect(customer.rewardPoints).toBe(5);
    expect(order.total()).toBe(10);
  });

  it("should get total of all orders", () => {
    const orderItemData1 = orderItemBuilder
      .withValue("price", 100)
      .withValue("quantity", 1)
      .build();
    const orderItemData2 = orderItemBuilder
      .withValue("price", 200)
      .withValue("quantity", 2)
      .build();

    const item1 = new OrderItem(orderItemData1);
    const item2 = new OrderItem(orderItemData2);

    const orderData1 = orderBuilder.withValue("items", [item1]).build();
    const orderData2 = orderBuilder.withValue("items", [item2]).build();

    const order1 = new Order(orderData1);
    const order2 = new Order(orderData2);

    const total = OrderService.total([order1, order2]);

    expect(total).toBe(500);
  });
});
