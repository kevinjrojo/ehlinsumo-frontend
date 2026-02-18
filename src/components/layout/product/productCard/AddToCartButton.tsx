"use client";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/cardContext";

interface AddToCartButtonProps {
  product: {
    id: number;
    name: string;
    price: number;
    image: string | undefined;
  };
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addToCart } = useCart();

  return (
    <button
      onClick={() => addToCart(product)}
      className="mt-2 w-full bg-green-600 flex justify-center items-center gap-2 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors duration-300"
    >
      <ShoppingCart size={18} /> Agregar
    </button>
  );
}
