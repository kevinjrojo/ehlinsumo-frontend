"use client";
import { Trash2 } from "lucide-react";
import { useCart } from "@/context/cardContext";
import { CartItem as CartItemType } from "@/types/cartTypes";
import { formatPrice } from "@/utils/formatPrice";
import Image from "next/image";

export default function CartItem({
  id,
  name,
  price,
  image,
  quantity,
}: CartItemType) {
  const { removeFromCart } = useCart();

  return (
    <div className="flex flex-col sm:flex-row items-center sm:justify-between bg-white dark:bg-green-600 rounded-xl shadow p-4 gap-4">
      {/* IZQUIERDA */}
      <div className="flex items-center gap-3 w-full sm:w-auto">
        {image && (
          <Image
            src={image}
            alt={name}
            width={40}
            height={40}
            className="h-10 w-10 object-cover object-center group-hover:scale-105 transition-transform duration-300"
          />
        )}

        <div className="flex flex-col">
          <h2 className="font-semibold text-base sm:text-lg text-gray-800 dark:text-gray-100 leading-tight">
            {name}
          </h2>

          <p className="text-gray-700 dark:text-gray-200 text-sm sm:text-base">
            ${formatPrice(price)} x {quantity}
          </p>
        </div>
      </div>

      {/* DERECHA */}
      <div className="flex items-center justify-between w-full sm:w-auto">
        <p className="font-semibold text-gray-800 dark:text-gray-100 text-lg sm:text-xl">
          ${formatPrice(price * quantity)}
        </p>

        <button
          onClick={() => removeFromCart(id)}
          className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 transition ml-4"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}
