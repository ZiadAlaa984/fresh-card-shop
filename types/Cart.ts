import { Product } from "./Products";

export interface ApiResponse {
  message: string;
  status: string;
  data: string[];
}
export interface CartResponce {
  status: string;
  data: {
    products: WishlistItem[];
    cartOwner: string;
    totalCartPrice: number;
  };
  numOfCartItems: number;
  cartId: string;
}

export interface AddCartResponce {
  status: string;
  message: string;
  data: {
    products: Product[];
  };
  numOfCartItems: number;
}

export interface CartProduct {
  products: Product[];
  totalCartPrice: number;
}
export interface WishlistItem {
  _id: string;
  count: number;
  price: number;
  product: {
    _id: string;
    title: string;
    imageCover: string;
    quantity: number;
    ratingsAverage: number;
    brand: string | null;
    category: {
      _id: string;
      name: string;
      slug: string;
      image: string;
    };
    subcategory: Array<{
      // Replace with actual fields if known
      _id?: string;
      name?: string;
    }>;
    id: string;
  };
}
