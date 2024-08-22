import { orderBuilder, orderItemBuilder } from "../data_builder/order";
import { Order } from "./order";
import { OrderItem } from "./order_item";

describe("Order unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      const orderData = orderBuilder.withValue("id", "").build();
      const order = new Order(orderData);
    }).toThrowError("Id is required");
  });

  it("should throw error when customerId is empty", () => {
    expect(() => {
      const orderData = orderBuilder.withValue("customerId", "").build();
      const order = new Order(orderData);
    }).toThrowError("CustomerId is required");
  });

  it("should throw error when items is empty", () => {
    expect(() => {
      const orderData = orderBuilder.withValue("items", []).build();
      const order = new Order(orderData);
    }).toThrowError("Items are required");
  });

  it("should calculate total", () => {
    const orderItemData = orderItemBuilder
      .withValue("price", 100)
      .withValue("quantity", 2)
      .build();
    const item = new OrderItem(orderItemData);
    const orderData = orderBuilder.withValue("items", [item]).build();
    const order = new Order(orderData);

    let total = order.total();

    expect(order.total()).toBe(200);

    const orderItemData2 = orderItemBuilder
      .withValue("price", 200)
      .withValue("quantity", 2)
      .build();

    const item2 = new OrderItem(orderItemData2);
    const orderData2 = orderBuilder.withValue("items", [item, item2]).build();
    const order2 = new Order(orderData2);

    total = order2.total();

    expect(total).toBe(600);
  });

  it("should throw error if the item qte is less or equal zero 0", () => {
    expect(() => {
      const orderItemData = orderItemBuilder.withValue("quantity", 0).build();
      const item = new OrderItem(orderItemData);
      const orderData = orderBuilder.withValue("items", [item]).build();
      const order = new Order(orderData);
    }).toThrowError("Quantity must be greater than 0");
  });
});
