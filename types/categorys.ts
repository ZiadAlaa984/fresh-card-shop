import { PaginationMetadata } from "./Products";

export interface Category {
  _id: string;
  name: string;
  image: string;
  slug: string;
}
export interface CategoryResponse {
  data: Category;
  metadata: PaginationMetadata;
  results: number;
}
