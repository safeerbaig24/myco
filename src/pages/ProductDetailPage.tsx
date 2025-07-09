// pages/ProductDetailWrapper.tsx
import { useParams } from "react-router-dom";
import ProductDetailPage from "../component/ProductDetails";

export default function ProductDetailWrapper() {
  const { categoryId, productId } = useParams();

  if (!categoryId || !productId) {
    return <div>Invalid product URL</div>;
  }

  return <ProductDetailPage categoryId={categoryId} productId={productId} />;
}
