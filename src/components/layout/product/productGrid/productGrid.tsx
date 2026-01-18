"use client";

import { useEffect, useState } from "react";
import ProductCard from "../productCard/productCard";
import { getProducts } from "@/services/products";
interface Product {
  id: number;
  documentId: string;
  name: string;
  price: number;
  image: string | null;
}

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p>Cargando productos...</p>;
  }

  return (
    <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((item) => (
        <ProductCard key={item.documentId} product={item} />
      ))}
    </section>
  );
}
