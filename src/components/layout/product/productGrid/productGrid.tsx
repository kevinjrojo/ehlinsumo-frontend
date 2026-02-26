"use client";

import { useEffect, useState } from "react";
import ProductCard from "../productCard/productCard";
import { getProducts } from "@/services/products";
import type { ProductUI } from "@/types/productUI";
import { useSearchParams } from "next/navigation";
import { normalizeText } from "@/utils/normalizeText";

export default function ProductGrid() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<ProductUI[]>([]);
  const [loading, setLoading] = useState(true);

  const selectedCategory = searchParams.get("category");
  const selectedSubCategory = searchParams.get("subCategory");

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p>Cargando productos...</p>;
  }

  const normalizedSelectedCategory = normalizeText(selectedCategory);
  const normalizedSelectedSubCategory = normalizeText(selectedSubCategory);

  const filteredProducts = products.filter((item) => {
    const matchCategory = normalizedSelectedCategory
      ? normalizeText(item.category) === normalizedSelectedCategory
      : true;

    const matchSubCategory = normalizedSelectedSubCategory
      ? normalizeText(item.subCategory) === normalizedSelectedSubCategory
      : true;

    return matchCategory && matchSubCategory;
  });

  return (
    <>
      {(selectedCategory || selectedSubCategory) && (
        <p className="mb-4 text-sm text-gray-600">
          Mostrando: {selectedCategory ?? "Todas"}
          {selectedSubCategory ? ` / ${selectedSubCategory}` : ""}
        </p>
      )}

      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((item) => (
          <ProductCard key={item.documentId} product={item} />
        ))}
      </section>

      {filteredProducts.length === 0 && (
        <p className="mt-6 text-gray-700">
          No hay productos para la categoría/subcategoría seleccionada.
        </p>
      )}
    </>
  );
}
