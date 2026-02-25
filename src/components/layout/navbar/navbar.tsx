"use client";

import { ShoppingCart, Menu, X } from "lucide-react";
import { useState } from "react";
import DesktopNav from "./desktopNav";
import MobileMenu from "./mobileMenu";
import SearchBar from "./searchBar";
import Link from "next/link";
import { useCart } from "@/context/cardContext";
import { categories } from "@/constants/categories";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState<number | null>(null);
  const { totalItems } = useCart();

  return (
    <header className="bg-green-600 text-white  w-full shadow-md sticky top-0 z-50">
      <nav className="flex justify-between items-center px-4 sm:px-8 h-16">
        {/* --- Botón hamburguesa (solo móvil) --- */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="sm:hidden p-2 hover:bg-green-700 rounded-md"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* --- Logo + Categorías --- */}
        <DesktopNav categories={categories} />

        {/* --- Input búsqueda --- */}
        <div className="hidden sm:flex flex-1 justify-end px-6">
          <SearchBar />
        </div>

        {/* --- Ícono carrito --- */}
        <Link
          href={"/cart"}
          className="p-2 hover:bg-green-700 rounded-md cursor-pointer relative"
        >
          <ShoppingCart size={24} />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {totalItems}
            </span>
          )}
        </Link>
      </nav>

      {/* --- Menú lateral móvil --- */}
      <MobileMenu
        open={menuOpen}
        setOpen={setMenuOpen}
        categories={categories}
        openCategory={openCategory}
        setOpenCategory={setOpenCategory}
      />
    </header>
  );
}
