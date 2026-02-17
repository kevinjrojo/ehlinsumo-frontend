import type { ProductUI } from "@/types/productUI";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export async function getProducts(): Promise<ProductUI[]> {
  const res = await fetch(`${STRAPI_URL}/api/products?populate=*`);

  if (!res.ok) {
    throw new Error("Error al obtener productos");
  }

  const json = await res.json();

  return json.data.map((item: any): ProductUI => {
    const imageItem = item.image?.[0]; // 👈 PRIMERA IMAGEN
    const imageUrl = imageItem?.formats?.small?.url || imageItem?.url;

    return {
      id: item.id,
      documentId: item.documentId,
      name: item.name,
      price: item.price,
      image: imageUrl ? `${STRAPI_URL}${imageUrl}` : null,
    };
  });
}

export async function getProductById(documentId: string) {
  const res = await fetch(
    `${STRAPI_URL}/api/products?filters[documentId][$eq]=${documentId}&populate=*`,
    { cache: "no-store" },
  );

  if (!res.ok) {
    throw new Error("Error al obtener el producto");
  }

  const json = await res.json();
  const item = json.data[0];

  if (!item) return null;

  const imageItem = item.image?.[0];
  const imageUrl = imageItem?.formats?.large?.url || imageItem?.url;
  const descriptionText = item.descripcion?.[0]?.children?.[0]?.text ?? "";

  const categoryText = item.category?.[0]?.children?.[0]?.text ?? "";

  return {
    id: item.id,
    documentId: item.documentId,
    name: item.name,
    description: descriptionText,
    category: categoryText,
    price: item.price,
    image: imageUrl ? `${STRAPI_URL}${imageUrl}` : null,
  };
}
