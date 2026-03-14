import { getPopularProducts } from "@/lib/products";
import { ProductCard } from "@/components/product/ProductCard";

export function PopularProducts() {
  const products = getPopularProducts();

  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="font-serif text-3xl sm:text-4xl text-slate-800 mb-2">
            Most Loved Gifts
          </h2>
          <p className="text-slate-500">Our customers can't stop gifting these</p>
        </div>

        {/* Mobile: horizontal scroll */}
        <div className="md:hidden flex gap-4 overflow-x-auto scroll-snap-x pb-4 -mx-4 px-4">
          {products.map((product, i) => (
            <div key={product.id} className="scroll-snap-start shrink-0 w-52">
              <ProductCard product={product} index={i} />
            </div>
          ))}
        </div>

        {/* Desktop: grid */}
        <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-4 gap-5">
          {products.slice(0, 8).map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
