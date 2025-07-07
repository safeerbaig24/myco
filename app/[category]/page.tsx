import ProductListingPage from "@/component/ProductListing";

interface PageProps {
  params: Promise<{
    category: string;
  }>;
}

export default async function CategoryPage({ params }: PageProps) {
  const data = await params;
  return <ProductListingPage categoryId={data?.category} />;
}
