// Tipo reducido usado en el listado del catálogo
// (coincide con los campos pedidos vía ?select=id,title,price,category,thumbnail,stock)
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
  total: number;
  skip: number;
  limit: number;
}

export interface ProductReview {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface ProductDimensions {
  width: number;
  height: number;
  depth: number;
}

// Tipo completo devuelto por GET /products/{id}
export interface ProductDetail extends ProductSummary {
  description: string;
  discountPercentage: number;
  rating: number;
  tags: string[];
  brand?: string;
  sku: string;
  weight: number;
  dimensions: ProductDimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: ProductReview[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  images: string[];
}
