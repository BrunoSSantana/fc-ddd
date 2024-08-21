import type { RepositoryInterface } from "@/domain/@shared/repository";
import type { Customer } from "../entity";

export interface CustomerRepositoryInterface
  extends RepositoryInterface<Customer> {}
