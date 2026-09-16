import { getProducts } from "@/lib/api";
import ProductCard from "@/components/ProductCard";

export const revalidate = 60;

export default async function HomePage() {
  const { products } = await getProducts();
  const productCards = [];
  for (const product of products) {
    productCards.push(<ProductCard key={product.id} product={product} />);
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Catálogo de productos</h1>
        </header>

        <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {productCards}
        </section>
      </div>
    </main>
  );
}