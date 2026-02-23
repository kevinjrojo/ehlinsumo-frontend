import { X } from "lucide-react";

export default function MobileMenu({
  open,
  setOpen,
  categories,
  openCategory,
  setOpenCategory,
}) {
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
                {cat.items.map((item, i) => (
                  <li
                    key={i}
                    className="hover:bg-green-600 px-2 py-1 rounded-md cursor-pointer"
                  >
                    {item}
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
