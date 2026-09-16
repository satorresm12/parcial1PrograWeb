"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { CartItem } from "@/types/product";

type CartProduct = Pick<CartItem, "id" | "title" | "price" | "thumbnail">;

interface CartContextType {
  items: CartItem[];
  totalItems: number;
  addToCart: (product: CartProduct) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (product: CartProduct) => {
    setItems((prev) => {
      const nuevoCarrito = [];
      let encontrado = false;

      for (const item of prev) {
        if (item.id === product.id) {
          nuevoCarrito.push({ ...item, quantity: item.quantity + 1 });
          encontrado = true;
        } else {
          nuevoCarrito.push(item);
        }
      }

      if (!encontrado) {
        nuevoCarrito.push({ ...product, quantity: 1 });
      }

      return nuevoCarrito;
    });
  };

  let totalItems = 0;
  for (const item of items) {
    totalItems += item.quantity;
  }

  return (
    <CartContext.Provider
      value={{ items, totalItems, addToCart}}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe usarse dentro de un CartProvider");
  }
  return context;
}