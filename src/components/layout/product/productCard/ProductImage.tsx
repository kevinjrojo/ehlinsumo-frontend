"use client";

interface ProductImageProps {
  image: string | null;
  name: string;
}

export default function ProductImage({ image, name }: ProductImageProps) {
  if (!image) {
    return (
      <div className="h-40 bg-gray-300 flex items-center justify-center">
        <span className="text-sm text-gray-600">Sin imagen</span>
      </div>
    );
  }

  return (
    <section className="aspect-square w-full overflow-hidden rounded-lg bg-gray-500 dark:bg-gray-400">
      <img
        src={image}
        alt={name}
        className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
      />
    </section>
  );
}
