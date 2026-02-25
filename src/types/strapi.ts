export interface StrapiImageFormat {
  url: string;
}

export interface StrapiImage {
  url: string;
  formats?: {
    small?: StrapiImageFormat;
    medium?: StrapiImageFormat;
    large?: StrapiImageFormat;
    thumbnail?: StrapiImageFormat;
  };
}

export interface StrapiRichTextChild {
  text?: string;
}

export interface StrapiRichTextBlock {
  children?: StrapiRichTextChild[];
}

export interface StrapiMediaRelation {
  data?: StrapiImage | StrapiImage[] | null;
}

export interface StrapiProduct {
  id: number;
  documentId: string;
  name: string;
  description?: StrapiRichTextBlock[];
  category?: string;
  subCategory?: string;
  subcategory?: string;
  price: number;
  image?: StrapiImage[] | StrapiImage | StrapiMediaRelation | null;
}

export interface StrapiCollectionResponse<T> {
  data: T[];
}
