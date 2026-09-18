"use client";

import { useCart } from "@/context/CartContext";

interface ProductQuantityControlsProps {
  productId: number;
}

export default function ProductQuantityControls({
  productId,
}: ProductQuantityControlsProps) {
  const { items, increaseQuantity, decreaseQuantity } = useCart();
  let quantity = 0;

  for (const item of items) {
    if (item.id === productId) {
      quantity = item.quantity;
    }
  }

  return (
    <div className="mt-3 flex items-center gap-3 md:w-fit">
      <button
        type="button"
        onClick={() => decreaseQuantity(productId)}
        disabled={quantity === 0}
        className="h-9 w-9 rounded-lg bg-slate-200 text-lg font-bold text-black hover:bg-slate-300 disabled:cursor-not-allowed disabled:opacity-50"
        aria-label="Disminuir cantidad"
      >
        −
      </button>
      <span className="min-w-8 text-center font-semibold text-slate-900">
        {quantity}
      </span>
      <button
        type="button"
        onClick={() => increaseQuantity(productId)}
        className="h-9 w-9 rounded-lg bg-slate-200 text-lg font-bold text-black hover:bg-slate-300"
        aria-label="Aumentar cantidad"
      >
        +
      </button>
    </div>
  );
}
