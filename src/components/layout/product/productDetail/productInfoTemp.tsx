"use client";

import QuantitySelector from "./quantitySelector";
import PaymentMethods from "./paymentMethods";
import type { RichText } from "@/types/strapi";
import { useCart } from "@/context/cardContext";
import type { Product } from "@/types/cartTypes";
import { useState } from "react";
import { formatPrice } from "@/utils/formatPrice";

interface ProductInfoTempProps {
  product: {
    id: number;
    name: string;
    description: RichText;
    category: string;
    price: number;
    image?: string;
  };
}

export default function ProductInfoTemp({ product }: ProductInfoTempProps) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    // build un producto EXACTAMENTE como espera addToCart
    const item: Product = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image ?? "",
    };

    // 👉 tu contexto solo agrega uno — luego lo mejoramos
    for (let i = 0; i < quantity; i++) {
      addToCart(item);
    }
  };

  return (
    <div>
      <div className="flex items-center text-sm text-gray-800 dark:text-gray-900 space-x-2">
        <a className="hover:text-primary" href="#">
          <strong>Categoria : </strong>
          {product.category}
        </a>
      </div>

      <h1 className="text-3xl font-bold mt-4 text-gray-900 dark:text-black">
        {product.name}
      </h1>

      <p>
        {product.description
          ?.map((p) => p.children.map((c) => c.text).join(""))
          .join("\n")}
      </p>

      <p className="text-3xl font-bold mt-4 text-gray-900 dark:text-black">
        ${formatPrice(product.price)}
      </p>

      <div className="mt-8 flex items-center space-x-4">
        <QuantitySelector value={quantity} onChange={setQuantity} />

        <button
          onClick={handleAddToCart}
          className="flex-1 bg-green-500 text-white py-3 px-6 rounded-md hover:bg-opacity-90 transition duration-300 font-semibold cursor-pointer"
        >
          Agregar al carrito
        </button>
      </div>

      <PaymentMethods />
    </div>
  );
}
