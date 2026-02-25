import { X } from "lucide-react";
import Link from "next/link";
import type { CategoryItem } from "@/constants/categories";

interface MobileMenuProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  categories: CategoryItem[];
  openCategory: number | null;
  setOpenCategory: (value: number | null) => void;
}

export default function MobileMenu({
  open,
  setOpen,
  categories,
  openCategory,
  setOpenCategory,
}: MobileMenuProps) {
  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-green-700 text-white transform ${
        open ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 z-40`}
    >
      <div className="p-4 flex justify-between items-center border-b border-green-500">
        <h2 className="text-lg font-semibold">Categorías</h2>
        <button onClick={() => setOpen(false)}>
          <X size={22} />
        </button>
      </div>

      <div className="p-4 space-y-2">
        {categories.map((cat, idx) => (
          <div key={idx}>
            <button
              onClick={() => setOpenCategory(openCategory === idx ? null : idx)}
              className="flex justify-between w-full items-center text-left py-2 font-medium"
            >
              {cat.name}
              <span>{openCategory === idx ? "−" : "+"}</span>
            </button>

            {openCategory === idx && (
              <ul className="pl-4 text-sm space-y-1">
                {cat.subcategories.map((item) => (
                  <li key={item}>
                    <Link
                      href={`/?category=${encodeURIComponent(cat.name)}&subCategory=${encodeURIComponent(item)}`}
                      className="block hover:bg-green-600 px-2 py-1 rounded-md cursor-pointer"
                      onClick={() => setOpen(false)}
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
