import { randomUUID } from "node:crypto";
import { Builder, type Shape } from "@brunoss/mock-builder";
import { faker } from "@faker-js/faker";
import { type OrderCreateInput } from "../entity";

const orderCreateInputShape: Shape<OrderCreateInput> = {
  id: randomUUID,
  customerId: randomUUID,
  items: [],
};

export const orderBuilder = new Builder(orderCreateInputShape);

export const orderItemBuilder = new Builder({
  id: faker.string.uuid,
  name: faker.word.words,
  price: faker.number.int({ max: 100, min: 1 }),
  productId: faker.string.uuid,
  quantity: faker.number.int({ max: 10, min: 1 }),
});
