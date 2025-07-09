"use client";
import { useState, useEffect } from "react";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { Button, Card, CardBody, Link } from "@heroui/react";
import { productData } from "../ulits/staticData";
import { useNavigate } from "react-router-dom";

interface Category {
  id: string;
  name: string;
  color: string;
  displayName: string;
  description: string;
}

interface ProductListingPageProps {
  categoryId: string;
}

const categories: Record<string, Category> = {
  syringes: {
    id: "syringes",
    name: "SYRINGES",
    displayName: "Syringes",
    color: "#2563eb",
    description: "High-precision syringes for medical applications",
  },
  blades: {
    id: "blades",
    name: "BLADES",
    displayName: "Blades",
    color: "#7CB342",
    description: "High-precision surgical blades for medical applications",
  },
  scalpels: {
    id: "scalpels",
    name: "SCALPELS",
    displayName: "Scalpels",
    color: "#FFC107",
    description: "High-precision scalpels for medical applications",
  },
  "sharps-safety": {
    id: "sharps-safety",
    name: "SHARPS SAFETY",
    displayName: "Sharps Safety",
    color: "#E91E63",
    description:
      "High-precision sharps safety products for medical applications",
  },
  "wound-closure": {
    id: "wound-closure",
    name: "WOUND CLOSURE",
    displayName: "Wound Closure",
    color: "#FF9800",
    description:
      "High-precision wound closure products for medical applications",
  },
  "anesthesia-needles": {
    id: "anesthesia-needles",
    name: "ANESTHESIA NEEDLES",
    displayName: "Anesthesia Needles",
    color: "#2196F3",
    description: "High-precision anesthesia needles for medical applications",
  },
  "blood-collection": {
    id: "blood-collection",
    name: "BLOOD COLLECTION",
    displayName: "Blood Collection",
    color: "#FF5722",
    description:
      "High-precision blood collection products for medical applications",
  },
  hypodermic: {
    id: "hypodermic",
    name: "HYPODERMIC",
    displayName: "Hypodermic",
    color: "#9C27B0",
    description: "High-precision hypodermic products for medical applications",
  },
};

export default function ProductListingPage({
  categoryId,
}: ProductListingPageProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();

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
  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Category not found
          </h1>
          <p className="text-gray-600 mb-4">
            Category "{categoryId}" does not exist.
          </p>
          <Link href="/" className="text-blue-600 hover:text-blue-800">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const products = productData[categoryId] || [];
  const itemsPerPage = 6;
  const totalItems = products.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  // Get products for current page
  const paginatedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white">
        <div className="px-6 lg:px-[160px] py-8">
          <div className="flex items-center text-sm text-gray-500">
            <button
              onClick={() => navigate("/")}
              className="md:text-lg font-medium cursor-pointer"
            >
              Home
            </button>
            <ChevronRight className="w-5 h-5 mx-2" />
            <span className="text-[#005F9E] md:text-lg font-medium">
              {category.name}
            </span>
          </div>
        </div>
      </div>
      {/* Header Section */}
      <div className="bg-[#005F9E0D] py-16 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-[40px] font-bold text-[#005F9E] mb-3">
            {category.name}
          </h1>
          <p className="text-lg text-[#005F9E]">{category.description}</p>
        </div>
      </div>

      {/* Products Grid */}
      <div className=" px-6 lg:px-[160px] py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedProducts.map((product) => (
            <Card
              key={product.id}
              className="bg-white shadow-sm hover:shadow-lg transition-shadow duration-200 p-0 rounded-2xl"
            >
              <CardBody
                className="p-0 cursor-pointer group"
                onClick={() => navigate(`/${categoryId}/${product.id}`)}
              >
                {/* Image with Hover Button Overlay */}
                <div className="relative bg-gray-50 flex justify-center items-center rounded-b-2xl w-full overflow-hidden">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="object-contain max-w-full max-h-full transition-transform duration-300 group-hover:scale-105"
                  />

                  {product.inStock && (
                    <div className="absolute inset-0 w-full flex items-end justify-center bottom-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button
                        onPress={() => {
                          navigate(`/${categoryId}/${product.id}`);
                        }}
                        className="bg-[#005F9E] text-white px-4 py-2 rounded-b-2xl w-full font-medium"
                      >
                        View Product
                      </Button>
                    </div>
                  )}
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
                      className="ml-2 p-1 text-gray-400 hover:text-gray-600 flex-shrink-0 cursor-pointer"
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
                </div>
              </CardBody>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-16 bg-[#005F9E1A] rounded-lg p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-[20px] max-w-[600px] mx-auto">
            {totalPages > 1 ? (
              <Button
                variant="ghost"
                className={`flex items-center gap-2 px-4 rounded-lg py-2 ${
                  currentPage == 1
                    ? "bg-[#4848481A] text-[#48484880]"
                    : "bg-[#484848] text-white"
                }`}
                onPress={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>
            ) : null}

            <div className="flex items-center gap-2">
              {pageNumbers.map((page, index) => (
                <div key={index}>
                  {page === "..." ? (
                    <span className="text-gray-400 mx-3 text-lg">...</span>
                  ) : (
                    <Button
                      variant={currentPage === page ? "solid" : "ghost"}
                      className={`w-10 h-10 rounded-lg p-0 text-base ${
                        currentPage === page
                          ? "bg-[#005F9E] text-white"
                          : "text-white bg-[#484848]"
                      }`}
                      onPress={() => setCurrentPage(page as number)}
                    >
                      {page}
                    </Button>
                  )}
                </div>
              ))}
            </div>
            {totalPages > 1 ? (
              <Button
                className={`flex items-center gap-2 rounded-lg px-4 py-2 ${
                  currentPage == totalPages
                    ? "bg-[#4848481A] text-[#48484880]"
                    : "bg-[#484848] text-white"
                }`}
                onPress={() =>
                  setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                }
                disabled={currentPage === totalPages}
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            ) : null}
            <div className="text-center text-base text-[#48484866]">
              Showing {startItem}-{endItem} of {totalItems} products
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
