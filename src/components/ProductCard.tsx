import Link from "next/link";
import Image from "next/image";
import { ProductSummary } from "@/types/product";
import AddToCartButton from "@/components/AddToCartButton";

export default function ProductCard({ product }: { product: ProductSummary }) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative aspect-square w-full bg-slate-100">
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition group-hover:scale-105"
          />
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-1 p-4">
        <span className="text-xs font-medium uppercase tracking-wide text-indigo-600">
          {product.category}
        </span>

        <Link href={`/products/${product.id}`}>
          <h2 className="line-clamp-2 font-semibold text-slate-900 hover:text-indigo-600">
            {product.title}
          </h2>
        </Link>

        <div className="mt-1 flex items-center justify-between">
          <span className="text-lg font-bold text-slate-900">
            ${product.price}
          </span>
          <span
            className={`text-xs font-medium ${
              product.stock > 0 ? "text-emerald-600" : "text-red-500"
            }`}
          >
            {product.stock > 0 ? `${product.stock} en stock` : "Agotado"}
          </span>
        </div>

        <AddToCartButton product={product} className="mt-3 w-full rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-indigo-700" />
      </div>
    </div>
  );
}