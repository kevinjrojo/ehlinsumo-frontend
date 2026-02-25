"use client";

import ProductImage from "./productImage";
import ProductInfoTemp from "./productInfoTemp";

interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  subCategory: string;
  price: number;
  image: string | undefined;
}

export default function ProductDetail({ product }: { product: Product }) {
  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <ProductImage image={product.image} name={product.name} />
        <ProductInfoTemp product={product} />
      </div>
    </main>
  );
}
