import type { RepositoryInterface } from "@/domain/@shared/repository/repository-interface";
import type { Product } from "../entity/product";

export interface ProductRepositoryInterface
  extends RepositoryInterface<Product> {}
