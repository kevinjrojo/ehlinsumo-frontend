export interface StrapiImageFormat {
  url: string;
}

export interface StrapiImage {
  url: string;
  formats?: {
    small?: StrapiImageFormat;
    large?: StrapiImageFormat;
  };
}

export interface StrapiRichTextChild {
  text?: string;
}

export interface StrapiRichTextBlock {
  children?: StrapiRichTextChild[];
}

export interface StrapiProduct {
  id: number;
  documentId: string;
  name: string;
  description?: StrapiRichTextBlock[];
  category?: string;
  price: number;
  image?: StrapiImage[];
}

export interface StrapiCollectionResponse<T> {
  data: T[];
}
