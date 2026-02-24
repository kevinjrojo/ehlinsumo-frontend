"use client";

import Image from "next/image";

interface ProductImageProps {
  image: string | undefined;
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
    <section className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-500 dark:bg-gray-400">
      <Image
        alt={name}
        src={image}
        fill
        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
      />
    </section>
  );
}
