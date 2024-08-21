import { randomUUID } from "node:crypto";
import { Builder, type Shape } from "@brunoss/mock-builder";
import { faker } from "@faker-js/faker/locale/pt_BR";
import { type CustomerCreateInput } from "../entity";
import type { AddressCreateInput } from "../value-object/address";

const customerCreateInputShape: Shape<CustomerCreateInput> = {
  id: randomUUID,
  name: faker.person.fullName,
};

export const customerBuilder = new Builder(customerCreateInputShape);

const addressCreateInputShape: Shape<AddressCreateInput> = {
  city: faker.location.city,
  number: faker.location.buildingNumber,
  street: faker.location.street,
  zip: faker.location.zipCode,
};

export const addressBuilder = new Builder(addressCreateInputShape);