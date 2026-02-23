export default function CategoryDropdown({ category }) {
  return (
    <div className="relative group">
      <button className="font-semibold m-2 cursor-pointer">
        {category.name}
      </button>
      <div className="absolute hidden group-hover:block bg-white text-gray-800 rounded-md shadow-md  min-w-[150px]">
        {category.items.map((item, i) => (
          <div
            key={i}
            className="px-4 py-2 hover:bg-gray-100 hover:rounded-lg cursor-pointer"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
