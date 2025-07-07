import ProductDetailPage from "@/component/ProductDetails";

interface PageProps {
  params: Promise<{
    category: string;
    productId: string;
  }>;
}

export default async function ProductPage({ params }: PageProps) {
  const data = await params;
  return (
    <ProductDetailPage
      categoryId={data?.category}
      productId={data?.productId}
    />
  );
}
