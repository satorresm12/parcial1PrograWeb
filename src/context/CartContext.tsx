"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { CartItem } from "@/types/product";

type CartProduct = Pick<CartItem, "id" | "title" | "price" | "thumbnail">;

interface CartContextType {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addToCart: (product: CartProduct) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (product: CartProduct) => {
    setItems((prev) => {
      const productoExistente = prev.find(
        (item) => item.id === product.id,
      );

      if (productoExistente) {
        const nuevoCarrito: CartItem[] = [];

        for (const item of prev) {
          if (item.id === productoExistente.id) {
            nuevoCarrito.push({
              ...productoExistente,
              quantity: productoExistente.quantity + 1,
            });
          } else {
            nuevoCarrito.push(item);
          }
        }

        return nuevoCarrito;
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const increaseQuantity = (id: number) => {
    setItems((prev) => {
      const nuevoCarrito: CartItem[] = [];

      for (const item of prev) {
        if (item.id === id) {
          nuevoCarrito.push({ ...item, quantity: item.quantity + 1 });
        } else {
          nuevoCarrito.push(item);
        }
      }

      return nuevoCarrito;
    });
  };

  const decreaseQuantity = (id: number) => {
    setItems((prev) => {
      const nuevoCarrito: CartItem[] = [];

      for (const item of prev) {
        if (item
          .id === id) {
          if (item.quantity > 1) {
            nuevoCarrito.push({ ...item, quantity: item.quantity - 1 });
          }
        } else {
          nuevoCarrito.push(item);
        }
      }

      return nuevoCarrito;
    });
  };

  const removeFromCart = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setItems([]);
  };

  let totalItems = 0;
  let totalPrice = 0;

  for (const item of items) {
    totalItems += item.quantity;
    totalPrice += item.price * item.quantity;
  }

  return (
    <CartContext.Provider
      value={{
        items,
        totalItems,
        totalPrice,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
      }}
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
