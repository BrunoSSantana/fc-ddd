import { randomUUID } from "node:crypto";
import { Builder, type Shape } from "@brunoss/mock-builder";
import { faker } from "@faker-js/faker/locale/pt_BR";
import type { CreateProductInput } from "../entity";

const productCreateInputShape: Shape<CreateProductInput> = {
  id: randomUUID,
  name: faker.word.words,
  price: faker.datatype.number({ min: 0, max: 1000, precision: 0.01 }),
};

export const productBuilder = new Builder(productCreateInputShape);
