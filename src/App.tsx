import { Routes, Route } from "react-router-dom";
import RadialProductWheel from "./component/CategoryRadial";
import SettingsPage from "./component/SettingsPage";
import Navbar from "./component/Navbar";
import ProductListingWrapper from "./pages/ProductListingPage";
import ProductDetailWrapper from "./pages/ProductDetailPage";
import InstallModal from "./component/InstallModal";

function App() {
  return (
    <>
      <InstallModal />
      <Navbar />
      <Routes>
        <Route path="/" element={<RadialProductWheel />} />
        <Route path="/:categoryId" element={<ProductListingWrapper />} />
        <Route
          path="/:categoryId/:productId"
          element={<ProductDetailWrapper />}
        />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </>
  );
}

export default App;
