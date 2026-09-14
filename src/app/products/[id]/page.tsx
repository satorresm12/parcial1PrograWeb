import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductById } from "@/lib/api";
import AddToCartButton from "@/components/AddToCartButton";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export const revalidate = 60;

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/"
          className="mb-6 inline-block text-sm font-medium text-indigo-600 hover:underline"
        >
          &larr; Volver al catálogo
        </Link>

        <div className="grid grid-cols-1 gap-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-2">
          <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-slate-100">
            <Image
              src={product.thumbnail}
              alt={product.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>

          <div className="flex flex-col">
            <span className="text-xs font-medium uppercase tracking-wide text-indigo-600">
              {product.category}
            </span>
            <h1 className="mt-1 text-2xl font-bold text-slate-900">
              {product.title}
            </h1>

            <div className="mt-3 flex items-center gap-3">
              <span className="text-2xl font-bold text-slate-900">
                ${product.price}
              </span>
              {product.discountPercentage > 0 && (
                <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                  -{product.discountPercentage}%
                </span>
              )}
            </div>

            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              {product.description}
            </p>

            <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="text-slate-400">Stock</dt>
                <dd
                  className={`font-medium ${
                    product.stock > 0 ? "text-emerald-600" : "text-red-500"
                  }`}
                >
                  {product.stock > 0 ? `${product.stock} unidades` : "Agotado"}
                </dd>
              </div>
              <div>
                <dt className="text-slate-400">Calificación</dt>
                <dd className="font-medium text-slate-900">
                  {product.rating} / 5
                </dd>
              </div>
              <div>
                <dt className="text-slate-400">Marca</dt>
                <dd className="font-medium text-slate-900">
                  {product.brand ?? "N/A"}
                </dd>
              </div>
            </dl>
            <AddToCartButton
              product={product}
              className="mt-6 w-full rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 md:w-auto"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
