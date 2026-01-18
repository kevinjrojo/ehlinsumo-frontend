"use client";

import { formatPrice } from "@/utils/formatPrice";

interface ProductInfoProps {
  name: string;
  price: number;
}

export default function ProductInfo({ name, price }: ProductInfoProps) {
  return (
    <section>
      <h3 className="mt-2 text-sm font-medium">{name}</h3>
      <p className="text-gray-600"> ${formatPrice(price)}</p>
    </section>
  );
}
