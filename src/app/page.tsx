import SearchBar from "@/components/layout/navbar/searchBar";
import ProductGrid from "@/components/layout/product/productGrid/productGrid";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="px-4 py-8">
      <div className="sm:hidden mb-4">
        <SearchBar />
      </div>
      <Suspense fallback={<p>Cargando productos...</p>}>
        <ProductGrid />
      </Suspense>
    </main>
  );
}
