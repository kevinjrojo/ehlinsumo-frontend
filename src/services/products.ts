import type { ProductUI } from "@/types/productUI";
import type {
  StrapiCollectionResponse,
  StrapiImage,
  StrapiMediaRelation,
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

function isMediaRelation(
  image: StrapiProduct["image"],
): image is StrapiMediaRelation {
  return Boolean(image) && typeof image === "object" && "data" in image;
}

function pickFirstImage(
  image: StrapiProduct["image"],
): StrapiImage | undefined {
  if (!image) return undefined;

  if (Array.isArray(image)) return image[0];

  if (isMediaRelation(image)) {
    const { data } = image;
    if (!data) return undefined;
    return Array.isArray(data) ? data[0] : data;
  }

  return image;
}

function extractPreferredImageUrl(image?: StrapiImage): string | undefined {
  if (!image) return undefined;
  return (
    image.formats?.small?.url ??
    image.formats?.medium?.url ??
    image.formats?.large?.url ??
    image.formats?.thumbnail?.url ??
    image.url
  );
}

export async function getProducts(): Promise<ProductUI[]> {
  const baseUrl = assertStrapiUrl();
  const res = await fetch(`${baseUrl}/api/products?populate=*`);

  if (!res.ok) {
    throw new Error("Error al obtener productos");
  }
  const json: StrapiCollectionResponse<StrapiProduct> = await res.json();

  return json.data.map((item): ProductUI => {
    const imageItem = pickFirstImage(item.image);
    const imageUrl = extractPreferredImageUrl(imageItem);

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

  const imageItem = pickFirstImage(item.image);
  const imageUrl = extractPreferredImageUrl(imageItem);

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
