"use client";
import Link from "next/link";
import ProductImage from "./ProductImage";
import ProductInfo from "./ProductInfo";
import AddToCartButton from "./AddToCartButton";

interface Product {
  id: number;
  name: string;
  documentId: string;
  price: number;
  image: string;
}

export default function ProductCard({ product }: { product: Product }) {
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
