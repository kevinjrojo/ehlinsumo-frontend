import ProductDetail from "@/components/layout/product/productDetail/productDetail";
import { getProductById } from "@/services/products";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function ProductsDetailPage({ params }: PageProps) {
  const { id } = await params;

  const product = await getProductById(id.trim());

  if (!product) {
    return <p className="text-center py-20">Producto no encontrado</p>;
  }

  return (
    <div>
      <ProductDetail product={product} />
    </div>
  );
}
