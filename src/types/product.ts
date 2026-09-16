export interface ProductSummary {
  id: number;
  title: string;
  price: number;
  category: string;
  thumbnail: string;
  stock: number;
}

export interface ProductsResponse {
  products: ProductSummary[];
}

export interface CartItem {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  quantity: number;
}

export interface ProductDetail extends ProductSummary {
  description: string;
  brand?: string;
}
