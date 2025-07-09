"use client";
import { useState, useEffect } from "react";
import {
  ChevronRight,
  ExternalLink,
  FileText,
  Play,
  Download,
  ArrowRight,
} from "lucide-react";
import { Button, Card, CardBody, Image, Input, Link } from "@heroui/react";
import { useNavigate } from "react-router-dom";

interface Product {
  id: string;
  name: string;
  sku: string;
  description: string;
  image: string;
  images: string[];
  inStock: boolean;
  specifications: {
    volume?: string;
    material?: string;
    graduation?: string;
    sterility?: string;
    length?: string;
    gauge?: string;
    capacity?: string;
    type?: string;
  };
  features: {
    title: string;
    bullet: string[];
  };
  documentation: {
    datasheet?: boolean;
    video?: boolean;
    manual?: boolean;
  };
}

interface Category {
  id: string;
  name: string;
  displayName: string;
}

interface ProductDetailPageProps {
  categoryId: string;
  productId: string;
}

const categories: Record<string, Category> = {
  syringes: { id: "syringes", name: "SYRINGES", displayName: "Syringes" },
  blades: { id: "blades", name: "BLADES", displayName: "Blades" },
  scalpels: { id: "scalpels", name: "SCALPELS", displayName: "Scalpels" },
  "sharps-safety": {
    id: "sharps-safety",
    name: "SHARPS SAFETY",
    displayName: "Sharps Safety",
  },
  "wound-closure": {
    id: "wound-closure",
    name: "WOUND CLOSURE",
    displayName: "Wound Closure",
  },
  "anesthesia-needles": {
    id: "anesthesia-needles",
    name: "ANESTHESIA NEEDLES",
    displayName: "Anesthesia Needles",
  },
  "blood-collection": {
    id: "blood-collection",
    name: "BLOOD COLLECTION",
    displayName: "Blood Collection",
  },
  hypodermic: {
    id: "hypodermic",
    name: "HYPODERMIC",
    displayName: "Hypodermic",
  },
};

const productData: Record<string, Product[]> = {
  syringes: [
    {
      id: "syr-001",
      name: "Precision Syringe Pro",
      sku: "SYR-PRO-10",
      description:
        "High-precision 10mL syringe with ergonomic design for accurate dosing",
      image: "/product.png",
      images: ["/product.png", "/product.png", "/product.png"],
      inStock: true,
      specifications: {
        volume: "10mL",
        material: "Medical Grade Plastic",
        graduation: "0.1mL",
        sterility: "Sterile, Single Use",
      },
      features: {
        title: "Features and Benefits",
        bullet: [
          "Computerized grinding ensures sharp, consistent, high-quality needles",
          "Exact fit between stylet and cannula bevel to minimize coring and trauma",
          "Large, clear hubs for enhanced tactile feel and visualization of CSF ",
          "Smooth insertion resistance provides for easy identification of tissue layers",
        ],
      },
      documentation: {
        datasheet: true,
        video: true,
        manual: true,
      },
    },
    {
      id: "syr-002",
      name: "Insulin Syringe Ultra",
      sku: "SYR-INS-30",
      description: "Ultra-fine insulin syringe for comfortable injections",
      image: "/product.png",
      images: ["/product.png", "/product.png"],
      inStock: true,
      specifications: {
        volume: "0.3mL",
        material: "Medical Grade Plastic",
        graduation: "0.01mL",
        sterility: "Sterile, Single Use",
      },
      features: {
        title: "Features and Benefits",
        bullet: [
          "Computerized grinding ensures sharp, consistent, high-quality needles",
          "Exact fit between stylet and cannula bevel to minimize coring and trauma",
          "Large, clear hubs for enhanced tactile feel and visualization of CSF ",
          "Smooth insertion resistance provides for easy identification of tissue layers",
        ],
      },
      documentation: {
        datasheet: true,
        video: false,
        manual: true,
      },
    },
    {
      id: "syr-003",
      name: "Safety Syringe 5ml",
      sku: "SYR-SAF-05",
      description: "Safety syringe with retractable needle mechanism",
      image: "/product.png",
      images: ["/product.png", "/product.png"],
      inStock: true,
      specifications: {
        volume: "5mL",
        material: "Medical Grade Plastic",
        graduation: "0.1mL",
        sterility: "Sterile, Single Use",
      },
      features: {
        title: "Features and Benefits",
        bullet: [
          "Computerized grinding ensures sharp, consistent, high-quality needles",
          "Exact fit between stylet and cannula bevel to minimize coring and trauma",
          "Large, clear hubs for enhanced tactile feel and visualization of CSF ",
          "Smooth insertion resistance provides for easy identification of tissue layers",
        ],
      },
      documentation: {
        datasheet: true,
        video: true,
        manual: true,
      },
    },
  ],
};

export default function ProductDetailPage({
  categoryId,
  productId,
}: ProductDetailPageProps) {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [email, setEmail] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  const category = categories[categoryId];
  const products = productData[categoryId] || [];
  const product = products.find((p) => p.id === productId);

  if (!category || !product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Product not found
          </h1>
          <Link href="/" className="text-blue-600 hover:text-blue-800">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const relatedProducts = products
    .filter((p) => p.id !== productId)
    .slice(0, 3);

  const handleSendDocuments = () => {
    if (email) {
      alert(`Documentation will be sent to: ${email}`);
      setEmail("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Product Detail */}
      <div className="px-6 lg:px-[160px]">
        {/* Breadcrumb */}
        <div className="py-8">
          <div className="flex items-center md:text-lg">
            <Link href="/" className="text-[#48484859]">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 mx-2" color="#48484859" />
            <Link href={`/${categoryId}`} className="text-[#48484859]">
              {category.displayName}
            </Link>
            <ChevronRight className="w-4 h-4 mx-2" color="#48484859" />
            <span className="text-[#005F9E] text-base font-medium">
              {product.name}
            </span>
          </div>
        </div>

        {/* Product Detail */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4 flex gap-5">
            {/* Thumbnail Images */}
            <div className="flex flex-col gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 border-2 rounded-lg overflow-hidden ${
                    selectedImage === index
                      ? "border-blue-600"
                      : "border-gray-200"
                  }`}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Main Image */}
            <div className="bg-white w-full rounded-lg h-[500px]">
              <img
                src={product.images[selectedImage] || "/product.png"}
                alt={product.name}
                className="object-cover w-full h-full aspect-square rounded-2xl"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            <div>
              <h1 className="text-[28px] font-semibold text-[#484848] mb-3">
                {product.name}
              </h1>
              <p className="text-lg font-medium text-[#005F9E] mb-3">
                SKU: {product.sku}
              </p>
              <p className="text-[#808080] text-lg leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Features */}

            <div className="rounded-2xl">
              <h2 className="text-xl font-medium text-[#005F9E] mb-3">
                {product?.features?.title}
              </h2>
              <div>
                <ul className="list-disc pl-5">
                  {Object.entries(product.features?.bullet).map(
                    ([key, value]) => (
                      <li
                        key={key}
                        className="text-[#484848] text-lg font-medium"
                      >
                        {value}
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>

            {/* Technical Specifications */}
            <div
              style={{ boxShadow: "0px 2px 20px 0px #0000000D" }}
              className="p-5 rounded-2xl"
            >
              <h2 className="text-xl font-medium text-[#005F9E] mb-3">
                Technical Specifications
              </h2>
              <div className="space-y-3">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex justify-between py-2 border-b border-[#4848481A] last:border-none"
                  >
                    <span className="font-medium text-[#484848] text-lg capitalize">
                      {key.replace(/([A-Z])/g, " $1").trim()}:
                    </span>
                    <span className="text-[#48484880] text-lg font-medium">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Documentation & Resources */}
            <div
              style={{ boxShadow: "0px 2px 20px 0px #0000000D" }}
              className="p-5 rounded-2xl"
            >
              <h2 className="text-xl font-semibold text-[#005F9E] mb-4">
                Documentation & Resources
              </h2>
              <div className="space-y-3">
                {product.documentation.datasheet && (
                  <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-[#48484826]">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-medium text-gray-900">
                          Technical Datasheet
                        </p>
                        <p className="text-sm text-gray-600">
                          Complete specifications and technical details
                        </p>
                      </div>
                    </div>
                    <ExternalLink className="w-5 h-5 text-gray-400" />
                  </div>
                )}

                {product.documentation.video && (
                  <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-[#48484826]">
                    <div className="flex items-center gap-3">
                      <Play className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="font-medium text-gray-900">
                          Video Instructions
                        </p>
                        <p className="text-sm text-gray-600">
                          Step by step usage guide
                        </p>
                      </div>
                    </div>
                    <ExternalLink className="w-5 h-5 text-gray-400" />
                  </div>
                )}

                {product.documentation.manual && (
                  <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-[#48484826]">
                    <div className="flex items-center gap-3">
                      <Download className="w-5 h-5 text-purple-600" />
                      <div>
                        <p className="font-medium text-gray-900">
                          Instruction Manual
                        </p>
                        <p className="text-sm text-gray-600">
                          Downloadable user guide
                        </p>
                      </div>
                    </div>
                    <ExternalLink className="w-5 h-5 text-gray-400" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-[28px] font-bold text-[#484848]">
                You might also like
              </h2>
              <Link
                href={`/${categoryId}`}
                className="flex items-center gap-2 text-[#005F9E] font-medium"
              >
                All Products
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProducts.map((product) => (
                <Card
                  key={product.id}
                  className="bg-white shadow-sm hover:shadow-lg transition-shadow duration-200 p-0 rounded-2xl"
                >
                  <CardBody
                    className="p-0"
                    onClick={() => navigate(`/${categoryId}/${product.id}`)}
                  >
                    {/* Product Image */}
                    <div className="bg-gray-50 flex justify-center">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="object-contain"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="p-5">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-[#484848] leading-tight pr-2">
                          {product.name}
                        </h3>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="ml-2 p-1 text-gray-400 hover:text-gray-600 flex-shrink-0"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </Button>
                      </div>

                      <p className="text-base text-[#005F9E] mb-2">
                        SKU: {product.sku}
                      </p>

                      <p className="text-sm text-[#808080] mb-6 leading-relaxed">
                        {product.description}
                      </p>

                      {/* <Link href={`/${categoryId}/${product.id}`}>
                    <Button
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 text-base"
                      disabled={!product.inStock}
                    >
                      {product.inStock ? "View Product" : "Out of Stock"}
                    </Button>
                  </Link> */}
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Email Documentation Section */}
        <div className="mt-20 mb-8 bg-[#005F9E0D] rounded-lg p-11 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="flex gap-3 justify-center items-center mb-3">
              <Image
                src="/email.png"
                alt="email"
                className="w-[26px] h-[21px]"
              />
              <h2 className="text-2xl font-semibold text-[#484848]">
                Get Product Documentation
              </h2>
            </div>
            <p className="text-[#48484880] text-lg mb-6">
              Enter your email address to receive the complete datasheet and
              technical documentation for this product.
            </p>
            <div className="flex flex-col md:flex-row gap-4 max-w-md mx-auto ">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-white border-none rounded-lg text-center pt-3 placeholder:text-center"
              />
              <Button
                onPress={handleSendDocuments}
                className="bg-[#005F9E] text-white px-5 py-[14px] rounded-lg flex gap-2"
              >
                <Image src="/send.png" alt="send" width={24} height={24} />
                Send Documents
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
