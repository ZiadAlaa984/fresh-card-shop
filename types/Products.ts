export interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface Product {
  sold: number;
  images: string[];
  subcategory: Subcategory[];
  ratingsQuantity: number;
  _id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  imageCover: string;
  category: Category;
  brand: string | null;
  ratingsAverage: number;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface Product {
  id: string;
  // Add other product properties here
}

export interface ProductResponse {
  data: Product;
  metadata: PaginationMetadataType;
  results: number;
}
export interface PaginationMetadataType {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage: number | null;
}
export interface ProductFilter {
  // fields?: string;
  [key: string]: string | number | undefined;
  sort?: string;
}
