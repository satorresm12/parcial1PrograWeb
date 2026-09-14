import Link from "next/link";
import Image from "next/image";
import { getProducts } from "@/lib/api";

export const revalidate = 60;

export default async function HomePage() {
  const { products } = await getProducts();

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Catálogo de productos</h1>
          <p className="mt-1 text-slate-500">
            Datos obtenidos desde la API pública de{" "}
            <span className="font-medium text-slate-700">DummyJSON</span>
          </p>
        </header>

        <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="relative aspect-square w-full bg-slate-100">
                <Image
                  src={product.thumbnail}
                  alt={product.title}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col gap-1 p-4">
                <span className="text-xs font-medium uppercase tracking-wide text-indigo-600">
                  {product.category}
                </span>
                <h2 className="line-clamp-2 font-semibold text-slate-900">
                  {product.title}
                </h2>
                <div className="mt-auto flex items-center justify-between pt-2">
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
              </div>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
