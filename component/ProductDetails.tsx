"use client";
import { useState, useEffect } from "react";
import {
  ChevronRight,
  Home,
  ExternalLink,
  FileText,
  Play,
  Download,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { Button, Card, CardBody, Input } from "@heroui/react";

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
      image: "/placeholder.svg?height=400&width=400",
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=400&width=400",
      ],
      inStock: true,
      specifications: {
        volume: "10mL",
        material: "Medical Grade Plastic",
        graduation: "0.1mL",
        sterility: "Sterile, Single Use",
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
      image: "/placeholder.svg?height=400&width=400",
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=400&width=400",
      ],
      inStock: true,
      specifications: {
        volume: "0.3mL",
        material: "Medical Grade Plastic",
        graduation: "0.01mL",
        sterility: "Sterile, Single Use",
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
      image: "/placeholder.svg?height=400&width=400",
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=400&width=400",
      ],
      inStock: true,
      specifications: {
        volume: "5mL",
        material: "Medical Grade Plastic",
        graduation: "0.1mL",
        sterility: "Sterile, Single Use",
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Breadcrumb */}
        <div className="mb-8">
          <div className="flex items-center text-sm text-gray-500">
            <Link
              href="/"
              className="hover:text-gray-700 flex items-center gap-1"
            >
              <Home className="w-4 h-4" />
              Home
            </Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <Link
              href={`/products/${categoryId}`}
              className="hover:text-gray-700"
            >
              {category.displayName}
            </Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-gray-900 font-medium">{product.name}</span>
          </div>
        </div>

        {/* Product Detail */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Thumbnail Images */}
            <div className="flex gap-4">
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
            <div className="bg-white rounded-lg border p-8">
              <img
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-96 object-contain"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>
              <p className="text-lg font-medium text-blue-600 mb-4">
                SKU: {product.sku}
              </p>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Technical Specifications */}
            <div>
              <h2 className="text-xl font-semibold text-blue-600 mb-4">
                Technical Specifications
              </h2>
              <div className="space-y-3">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex justify-between py-2 border-b border-gray-200"
                  >
                    <span className="font-medium text-gray-700 capitalize">
                      {key.replace(/([A-Z])/g, " $1").trim()}:
                    </span>
                    <span className="text-gray-600">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Documentation & Resources */}
            <div>
              <h2 className="text-xl font-semibold text-blue-600 mb-4">
                Documentation & Resources
              </h2>
              <div className="space-y-3">
                {product.documentation.datasheet && (
                  <div className="flex items-center justify-between p-4 bg-white rounded-lg border">
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
                  <div className="flex items-center justify-between p-4 bg-white rounded-lg border">
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
                  <div className="flex items-center justify-between p-4 bg-white rounded-lg border">
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
              <h2 className="text-2xl font-bold text-gray-900">
                You might also like
              </h2>
              <Link
                href={`/products/${categoryId}`}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
              >
                All Products
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProducts.map((relatedProduct) => (
                <Card
                  key={relatedProduct.id}
                  className="bg-white shadow-sm hover:shadow-lg transition-shadow"
                >
                  <CardBody className="p-0">
                    <div className="aspect-[4/3] bg-gray-50 flex items-center justify-center p-6">
                      <img
                        src={relatedProduct.image || "/placeholder.svg"}
                        alt={relatedProduct.name}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-lg font-semibold text-gray-900 leading-tight">
                          {relatedProduct.name}
                        </h3>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="ml-2 p-1 text-gray-400 hover:text-gray-600"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                      <p className="text-sm font-medium text-blue-600 mb-3">
                        SKU: {relatedProduct.sku}
                      </p>
                      <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                        {relatedProduct.description}
                      </p>
                      <Link href={`/${categoryId}/${relatedProduct.id}`}>
                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium">
                          View Product
                        </Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Email Documentation Section */}
        <div className="mt-20 bg-white rounded-lg border p-8 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Get Product Documentation
            </h2>
            <p className="text-gray-600 mb-8">
              Enter your email address to receive the complete datasheet and
              technical documentation for this product.
            </p>
            <div className="flex gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1"
              />
              <Button
                onClick={handleSendDocuments}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6"
              >
                Send Documents
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
