// Producto tal como viene de Strapi
export interface ProductAPI {
  id: number;
  documentId: string;
  name: string;
  description: any;
  category: string;
  price: number;
  image: string | null;
}
