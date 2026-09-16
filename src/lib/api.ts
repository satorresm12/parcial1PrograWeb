import { ProductDetail, ProductsResponse } from "@/types/product";

const BASE_URL = "https://dummyjson.com";

/**
 * Obtiene el listado del catálogo (8 productos) con los campos
 * necesarios para la vista de tarjetas.
 */
export async function getProducts(): Promise<ProductsResponse> {
  const res = await fetch(
    `${BASE_URL}/products?limit=8&select=id,title,price,category,thumbnail,stock`,
    { next: { revalidate: 60 } }
  );

  if (!res.ok) {
    throw new Error(`Error al obtener el catálogo: ${res.status}`);
  }

  return res.json();
}

/**
 * Obtiene el detalle de un producto individual por id.
 */
export async function getProductById(id: string | number): Promise<ProductDetail | null> {
  const res = await fetch(`${BASE_URL}/products/${id}`, {
    next: { revalidate: 60 },
  });

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new Error(`Error al obtener el producto ${id}: ${res.status}`);
  }

  return res.json();
}
