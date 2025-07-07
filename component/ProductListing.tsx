"use client";
import { useState, useEffect } from "react";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button, Card, CardBody } from "@heroui/react";

interface Product {
  id: string;
  name: string;
  sku: string;
  description: string;
  image: string;
  inStock: boolean;
}

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

const productData: Record<string, Product[]> = {
  syringes: [
    {
      id: "syr-001",
      name: "Precision Syringe Pro 10ml",
      sku: "SYR-PRO-10",
      description:
        "High-precision 10mL syringe with ergonomic design for accurate dosing",
      image: "/placeholder.svg?height=150&width=200",
      inStock: true,
    },
    {
      id: "syr-002",
      name: "Insulin Syringe Ultra",
      sku: "SYR-INS-30",
      description: "Ultra-fine insulin syringe for comfortable injections",
      image: "/placeholder.svg?height=150&width=200",
      inStock: true,
    },
    {
      id: "syr-003",
      name: "Safety Syringe 5ml",
      sku: "SYR-SAF-05",
      description: "Safety syringe with retractable needle mechanism",
      image: "/placeholder.svg?height=150&width=200",
      inStock: true,
    },
    {
      id: "syr-004",
      name: "Tuberculin Syringe 1ml",
      sku: "SYR-TB-01",
      description: "Precision tuberculin syringe for small volume injections",
      image: "/placeholder.svg?height=150&width=200",
      inStock: false,
    },
    {
      id: "syr-005",
      name: "Oral Syringe 20ml",
      sku: "SYR-ORL-20",
      description: "Oral medication syringe with clear markings",
      image: "/placeholder.svg?height=150&width=200",
      inStock: true,
    },
    {
      id: "syr-006",
      name: "Catheter Tip Syringe 60ml",
      sku: "SYR-CAT-60",
      description: "Large volume syringe with catheter tip for irrigation",
      image: "/placeholder.svg?height=150&width=200",
      inStock: true,
    },
  ],
  blades: [
    {
      id: "bld-001",
      name: "Surgical Blade #10",
      sku: "BLD-10-ST",
      description:
        "Standard #10 surgical blade for general procedures with precision cutting edge",
      image: "/placeholder.svg?height=150&width=200",
      inStock: true,
    },
    {
      id: "bld-002",
      name: "Surgical Blade #15",
      sku: "BLD-15-ST",
      description:
        "Curved #15 surgical blade for precision cutting in delicate procedures",
      image: "/placeholder.svg?height=150&width=200",
      inStock: true,
    },
    {
      id: "bld-003",
      name: "Surgical Blade #11",
      sku: "BLD-11-ST",
      description:
        "Sharp pointed #11 surgical blade for precise incisions and punctures",
      image: "/placeholder.svg?height=150&width=200",
      inStock: true,
    },
    {
      id: "bld-004",
      name: "Surgical Blade #12",
      sku: "BLD-12-ST",
      description:
        "Curved #12 surgical blade with hook design for specialized procedures",
      image: "/placeholder.svg?height=150&width=200",
      inStock: false,
    },
    {
      id: "bld-005",
      name: "Surgical Blade #20",
      sku: "BLD-20-ST",
      description: "Large #20 surgical blade for major surgical procedures",
      image: "/placeholder.svg?height=150&width=200",
      inStock: true,
    },
    {
      id: "bld-006",
      name: "Surgical Blade #21",
      sku: "BLD-21-ST",
      description:
        "Large curved #21 surgical blade for extensive cutting procedures",
      image: "/placeholder.svg?height=150&width=200",
      inStock: true,
    },
  ],
  scalpels: [
    {
      id: "scp-001",
      name: "Disposable Scalpel #10",
      sku: "SCP-DIS-10",
      description:
        "Complete disposable scalpel with #10 blade for single-use procedures",
      image: "/placeholder.svg?height=150&width=200",
      inStock: true,
    },
    {
      id: "scp-002",
      name: "Safety Scalpel Pro",
      sku: "SCP-SAF-PRO",
      description:
        "Safety scalpel with retractable blade mechanism for enhanced protection",
      image: "/placeholder.svg?height=150&width=200",
      inStock: true,
    },
    {
      id: "scp-003",
      name: "Reusable Scalpel Handle",
      sku: "SCP-HDL-04",
      description:
        "Durable reusable scalpel handle compatible with standard blades",
      image: "/placeholder.svg?height=150&width=200",
      inStock: true,
    },
    {
      id: "scp-004",
      name: "Precision Scalpel Kit",
      sku: "SCP-KIT-PRO",
      description: "Complete precision scalpel kit with multiple blade options",
      image: "/placeholder.svg?height=150&width=200",
      inStock: true,
    },
    {
      id: "scp-005",
      name: "Micro Scalpel Ultra",
      sku: "SCP-MIC-ULT",
      description:
        "Ultra-fine micro scalpel for delicate microsurgical procedures",
      image: "/placeholder.svg?height=150&width=200",
      inStock: false,
    },
    {
      id: "scp-006",
      name: "Electric Scalpel Pro",
      sku: "SCP-ELC-PRO",
      description: "Advanced electric scalpel with precise temperature control",
      image: "/placeholder.svg?height=150&width=200",
      inStock: true,
    },
  ],
  "sharps-safety": [
    {
      id: "shs-001",
      name: "Safety Needle 25G",
      sku: "SHS-NDL-25",
      description:
        "Retractable safety needle with automatic activation mechanism",
      image: "/placeholder.svg?height=150&width=200",
      inStock: true,
    },
    {
      id: "shs-002",
      name: "Sharps Container 5L",
      sku: "SHS-CNT-05",
      description:
        "Puncture-resistant sharps disposal container with secure lid",
      image: "/placeholder.svg?height=150&width=200",
      inStock: true,
    },
    {
      id: "shs-003",
      name: "Safety Lancet",
      sku: "SHS-LNC-01",
      description: "Single-use safety lancet for blood sampling procedures",
      image: "/placeholder.svg?height=150&width=200",
      inStock: true,
    },
    {
      id: "shs-004",
      name: "Needle Destroyer",
      sku: "SHS-DST-01",
      description: "Electric needle destroyer for safe needle disposal",
      image: "/placeholder.svg?height=150&width=200",
      inStock: true,
    },
    {
      id: "shs-005",
      name: "Safety IV Catheter",
      sku: "SHS-IVC-20",
      description: "Safety IV catheter with integrated needle protection",
      image: "/placeholder.svg?height=150&width=200",
      inStock: false,
    },
    {
      id: "shs-006",
      name: "Retractable Syringe",
      sku: "SHS-SYR-03",
      description: "3mL retractable syringe with automatic needle retraction",
      image: "/placeholder.svg?height=150&width=200",
      inStock: true,
    },
  ],
  "wound-closure": [
    {
      id: "wnd-001",
      name: "Absorbable Sutures 3-0",
      sku: "WND-SUT-30",
      description: "Absorbable sutures for internal tissue closure and healing",
      image: "/placeholder.svg?height=150&width=200",
      inStock: true,
    },
    {
      id: "wnd-002",
      name: "Non-Absorbable Sutures 2-0",
      sku: "WND-SUT-20",
      description: "Non-absorbable sutures for external wound closure",
      image: "/placeholder.svg?height=150&width=200",
      inStock: true,
    },
    {
      id: "wnd-003",
      name: "Surgical Staples",
      sku: "WND-STP-01",
      description: "Stainless steel surgical staples for rapid wound closure",
      image: "/placeholder.svg?height=150&width=200",
      inStock: true,
    },
    {
      id: "wnd-004",
      name: "Skin Adhesive",
      sku: "WND-ADH-01",
      description: "Medical grade skin adhesive for minor wound closure",
      image: "/placeholder.svg?height=150&width=200",
      inStock: true,
    },
    {
      id: "wnd-005",
      name: "Wound Closure Strips",
      sku: "WND-STR-01",
      description: "Sterile wound closure strips for superficial lacerations",
      image: "/placeholder.svg?height=150&width=200",
      inStock: true,
    },
    {
      id: "wnd-006",
      name: "Hemostatic Agent",
      sku: "WND-HEM-01",
      description: "Topical hemostatic agent for bleeding control",
      image: "/placeholder.svg?height=150&width=200",
      inStock: false,
    },
  ],
  "anesthesia-needles": [
    {
      id: "ans-001",
      name: "Spinal Needle 25G",
      sku: "ANS-SPN-25",
      description: "Pencil-point spinal needle for lumbar puncture procedures",
      image: "/placeholder.svg?height=150&width=200",
      inStock: true,
    },
    {
      id: "ans-002",
      name: "Epidural Needle 18G",
      sku: "ANS-EPI-18",
      description:
        "Tuohy epidural needle with curved tip for precise placement",
      image: "/placeholder.svg?height=150&width=200",
      inStock: true,
    },
    {
      id: "ans-003",
      name: "Block Needle 22G",
      sku: "ANS-BLK-22",
      description: "Insulated block needle for peripheral nerve blocks",
      image: "/placeholder.svg?height=150&width=200",
      inStock: true,
    },
    {
      id: "ans-004",
      name: "Dental Needle 27G",
      sku: "ANS-DNT-27",
      description: "Ultra-fine dental needle for local anesthesia injection",
      image: "/placeholder.svg?height=150&width=200",
      inStock: true,
    },
    {
      id: "ans-005",
      name: "Facet Joint Needle",
      sku: "ANS-FCT-01",
      description: "Specialized needle for facet joint injections",
      image: "/placeholder.svg?height=150&width=200",
      inStock: false,
    },
    {
      id: "ans-006",
      name: "Trigger Point Needle",
      sku: "ANS-TRG-01",
      description: "Fine gauge needle for trigger point injections",
      image: "/placeholder.svg?height=150&width=200",
      inStock: true,
    },
  ],
  "blood-collection": [
    {
      id: "bld-001",
      name: "Vacutainer Needle 21G",
      sku: "BLD-VAC-21",
      description:
        "Multi-sample needle for blood collection with vacutainer tubes",
      image: "/placeholder.svg?height=150&width=200",
      inStock: true,
    },
    {
      id: "bld-002",
      name: "Collection Tubes EDTA",
      sku: "BLD-TUB-ED",
      description: "EDTA anticoagulant tubes for hematology testing",
      image: "/placeholder.svg?height=150&width=200",
      inStock: true,
    },
    {
      id: "bld-003",
      name: "Butterfly Needle 23G",
      sku: "BLD-BTF-23",
      description: "Winged infusion set for difficult venipuncture",
      image: "/placeholder.svg?height=150&width=200",
      inStock: true,
    },
    {
      id: "bld-004",
      name: "Serum Separator Tubes",
      sku: "BLD-TUB-SS",
      description: "Gel separator tubes for serum chemistry testing",
      image: "/placeholder.svg?height=150&width=200",
      inStock: true,
    },
    {
      id: "bld-005",
      name: "Lancets 28G",
      sku: "BLD-LNC-28",
      description: "Single-use lancets for capillary blood sampling",
      image: "/placeholder.svg?height=150&width=200",
      inStock: true,
    },
    {
      id: "bld-006",
      name: "Blood Transfer Device",
      sku: "BLD-TRF-01",
      description: "Needle-free blood transfer device for sample collection",
      image: "/placeholder.svg?height=150&width=200",
      inStock: false,
    },
  ],
  hypodermic: [
    {
      id: "hyp-001",
      name: "Hypodermic Needle 25G",
      sku: "HYP-NDL-25",
      description: "Standard hypodermic needle for subcutaneous injections",
      image: "/placeholder.svg?height=150&width=200",
      inStock: true,
    },
    {
      id: "hyp-002",
      name: "Hypodermic Needle 27G",
      sku: "HYP-NDL-27",
      description: "Fine gauge needle for insulin and vaccine injections",
      image: "/placeholder.svg?height=150&width=200",
      inStock: true,
    },
    {
      id: "hyp-003",
      name: "Hypodermic Needle 21G",
      sku: "HYP-NDL-21",
      description: "Large bore needle for intramuscular injections",
      image: "/placeholder.svg?height=150&width=200",
      inStock: true,
    },
    {
      id: "hyp-004",
      name: "Safety Hypodermic Needle",
      sku: "HYP-SAF-01",
      description: "Safety hypodermic needle with protective sheath",
      image: "/placeholder.svg?height=150&width=200",
      inStock: true,
    },
    {
      id: "hyp-005",
      name: "Pen Needle 32G",
      sku: "HYP-PEN-32",
      description: "Ultra-fine pen needle for insulin pen devices",
      image: "/placeholder.svg?height=150&width=200",
      inStock: true,
    },
    {
      id: "hyp-006",
      name: "Filter Needle",
      sku: "HYP-FLT-01",
      description: "Filter needle for medication preparation from ampoules",
      image: "/placeholder.svg?height=150&width=200",
      inStock: false,
    },
  ],
};

export default function ProductListingPage({
  categoryId,
}: ProductListingPageProps) {
  const [currentPage, setCurrentPage] = useState(1);
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
  console.log("Category ID:", categoryId);
  console.log("Available categories:", Object.keys(productData));
  console.log("Products found:", products.length);
  console.log("Products:", products);
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
      {/* Header Section */}
      <div className="bg-gray-100 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-blue-600 mb-4">
            {category.name}
          </h1>
          <p className="text-lg sm:text-xl text-blue-600">
            {category.description}
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedProducts.map((product) => (
            <Card
              key={product.id}
              className="bg-white shadow-sm hover:shadow-lg transition-shadow duration-200"
            >
              <CardBody className="p-0">
                {/* Product Image */}
                <div className="aspect-[4/3] bg-gray-50 flex items-center justify-center p-8">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-semibold text-gray-900 leading-tight pr-2">
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

                  <p className="text-sm font-medium text-blue-600 mb-4">
                    SKU: {product.sku}
                  </p>

                  <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                    {product.description}
                  </p>

                  <Link href={`/${categoryId}/${product.id}`}>
                    <Button
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 text-base"
                      disabled={!product.inStock}
                    >
                      {product.inStock ? "View Product" : "Out of Stock"}
                    </Button>
                  </Link>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-16 bg-gray-200 rounded-lg p-8">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 px-4 py-2"
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>

            <div className="flex items-center gap-2">
              {pageNumbers.map((page, index) => (
                <div key={index}>
                  {page === "..." ? (
                    <span className="text-gray-400 mx-3 text-lg">...</span>
                  ) : (
                    <Button
                      variant={currentPage === page ? "solid" : "ghost"}
                      className={`w-12 h-12 p-0 text-base ${
                        currentPage === page
                          ? "bg-blue-600 text-white hover:bg-blue-700"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                      }`}
                      onClick={() => setCurrentPage(page as number)}
                    >
                      {page}
                    </Button>
                  )}
                </div>
              ))}
            </div>

            <Button
              variant="ghost"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 px-4 py-2"
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          <div className="text-center mt-6 text-base text-gray-600">
            Showing {startItem}-{endItem} of {totalItems} products
          </div>
        </div>
      </div>
    </div>
  );
}
