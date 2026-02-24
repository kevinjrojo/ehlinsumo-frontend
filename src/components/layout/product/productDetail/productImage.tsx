"use client";

import Image from "next/image";

interface ProductImageProps {
  image: string | undefined;
  name: string;
}

export default function ProductImage({ image, name }: ProductImageProps) {
  return (
    <div className="relative h-[500px] w-full rounded-xl bg-cover bg-center overflow-hidden">
      {image && (
        <Image
          alt={name}
          src={image}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
        />
      )}
    </div>
  );
}
