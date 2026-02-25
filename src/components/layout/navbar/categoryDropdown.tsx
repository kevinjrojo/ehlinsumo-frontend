import Link from "next/link";
import type { CategoryItem } from "@/constants/categories";

interface CategoryDropdownProps {
  category: CategoryItem;
}

export default function CategoryDropdown({ category }: CategoryDropdownProps) {
  return (
    <div className="relative group">
      <button className="font-semibold m-2 cursor-pointer">
        {category.name}
      </button>
      <div className="absolute hidden group-hover:block bg-white text-gray-800 rounded-md shadow-md min-w-[180px]">
        {category.subcategories.map((item) => (
          <Link
            key={item}
            href={`/?category=${encodeURIComponent(category.name)}&subCategory=${encodeURIComponent(item)}`}
            className="block px-4 py-2 hover:bg-gray-100 hover:rounded-lg cursor-pointer"
          >
            {item}
          </Link>
        ))}
      </div>
    </div>
  );
}
