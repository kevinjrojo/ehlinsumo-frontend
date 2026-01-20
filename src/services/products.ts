import type { ProductAPI } from "@/types/product";
import type { ProductUI } from "@/types/ui";

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://127.0.0.1:1337";

export async function getProducts(): Promise<ProductUI[]> {
  const res = await fetch(`${STRAPI_URL}/api/products?populate=*`);

  if (!res.ok) {
    throw new Error("Error al obtener productos");
  }

  const json = await res.json();

  return json.data.map(
    (item: any): ProductUI => ({
      id: item.id,
      documentId: item.documentId,
      name: item.name,
      price: item.price,
      image: item.image?.url ? `${STRAPI_URL}${item.image.url}` : "", // 👈 NUNCA null
    }),
  );
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

  return {
    id: item.id,
    documentId: item.documentId,
    name: item.name,
    description: item.description,
    category: item.Categoria,
    price: item.price,
    image: item.image?.url ? `${STRAPI_URL}${item.image.url}` : "",
  };
}
