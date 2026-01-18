"use client";
import { useCart } from "@/context/cardContext";
import { formatPrice } from "@/utils/formatPrice";

export default function CartSummary() {
  const { total, clearCart } = useCart();

  return (
    <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <h2 className="text-2xl font-semibold">
        Total: <span className="text-green-600">${formatPrice(total)}</span>
      </h2>

      <div className="flex gap-3">
        <button
          onClick={clearCart}
          className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400 dark:hover:bg-gray-600 transition"
        >
          Vaciar carrito
        </button>
        <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition">
          Finalizar compra
        </button>
      </div>
    </div>
  );
}
