"use client";
import Link from "next/link";
import ProductImage from "./ProductImage";
import ProductInfo from "./ProductInfo";
import AddToCartButton from "./AddToCartButton";
import type { ProductUI } from "@/types/productUI";

export default function ProductCard({ product }: { product: ProductUI }) {
  console.log("LINK PRODUCT:", product);
  return (
    <article className="group relative bg-gray-100 border border-gray-400 rounded-md p-2">
      <Link href={`/products/${product.documentId.trim()}`}>
        <ProductImage image={product.image} name={product.name} />
        <ProductInfo name={product.name} price={product.price} />
      </Link>

      <AddToCartButton product={product} />
    </article>
  );
}
