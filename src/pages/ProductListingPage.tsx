// pages/ProductListingWrapper.tsx
import { useParams } from "react-router-dom";
import ProductListingPage from "../component/ProductListing";

export default function ProductListingWrapper() {
  const { categoryId } = useParams();

  if (!categoryId) return <div>Missing category ID</div>;

  return <ProductListingPage categoryId={categoryId} />;
}
