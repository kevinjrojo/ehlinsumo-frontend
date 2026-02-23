import type { ProductUI } from "@/types/productUI";
import type {
  StrapiCollectionResponse,
  StrapiProduct,
  StrapiRichTextBlock,
} from "@/types/strapi";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

function getImageUrl(baseUrl: string, rawUrl?: string): string | undefined {
  if (!rawUrl) return undefined;
  if (rawUrl.startsWith("http://") || rawUrl.startsWith("https://"))
    return rawUrl;
  return `${baseUrl}${rawUrl}`;
}

function extractText(richText?: StrapiRichTextBlock[]): string {
  if (!Array.isArray(richText)) return "";

  return richText
    .flatMap((block) => block.children ?? [])
    .map((child) => child.text ?? "")
    .join(" ")
    .trim();
}

function assertStrapiUrl(): string {
  if (!STRAPI_URL) {
    throw new Error("Falta NEXT_PUBLIC_STRAPI_URL en las variables de entorno");
  }
  return STRAPI_URL;
}

export async function getProducts(): Promise<ProductUI[]> {
  const baseUrl = assertStrapiUrl();
  const res = await fetch(`${baseUrl}/api/products?populate=*`);

  if (!res.ok) {
    throw new Error("Error al obtener productos");
  }

  const json: StrapiCollectionResponse<StrapiProduct> = await res.json();

  return json.data.map((item): ProductUI => {
    const imageItem = item.image?.[0];
    const imageUrl = imageItem?.formats?.small?.url ?? imageItem?.url;

    return {
      id: item.id,
      documentId: item.documentId,
      name: item.name,
      price: item.price,
      image: getImageUrl(baseUrl, imageUrl),
    };
  });
}

export async function getProductById(documentId: string) {
  const baseUrl = assertStrapiUrl();
  const res = await fetch(
    `${baseUrl}/api/products?filters[documentId][$eq]=${documentId}&populate=*`,
    { cache: "no-store" },
  );

  if (!res.ok) {
    throw new Error("Error al obtener el producto");
  }

  const json: StrapiCollectionResponse<StrapiProduct> = await res.json();
  const item = json.data[0];

  if (!item) return null;

  const imageItem = item.image?.[0];
  const imageUrl = imageItem?.formats?.large?.url ?? imageItem?.url;

  return {
    id: item.id,
    documentId: item.documentId,
    name: item.name,
    description: extractText(item.description),
    category: item.category ?? "",
    price: item.price,
    image: getImageUrl(baseUrl, imageUrl),
  };
}
