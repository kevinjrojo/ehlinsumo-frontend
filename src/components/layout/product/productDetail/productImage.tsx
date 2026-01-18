"use client";

interface ProductImageProps {
  image: string;
  name: string;
}

export default function ProductImage({ image, name }: ProductImageProps) {
  return (
    <div className="h-100 rounded-xl bg-cover bg-center">
      <img
        alt={name}
        className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
        src={image}
        width={500}
        height={500}
      />
    </div>
  );
}
