export interface Product {
  id: string;
  name: string;
  sku: string;
  description: string;
  image: string;
  inStock: boolean;
}

export interface ProductListingPageProps {
  categoryId: string;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  enabled: boolean;
  products: string[];
  image: string;
}

export const categories: Category[] = [
  {
    id: "syringes",
    name: "SYRINGES",
    color: "#00BCD4",
    enabled: true,
    products: ["Disposable Syringes", "Safety Syringes"],
    image: "/dummy.png",
  },
  {
    id: "blades",
    name: "BLADES",
    color: "#4CAF50",
    enabled: true,
    products: ["Surgical Blades", "Disposable Blades"],
    image: "/dummy-3.png",
  },
  {
    id: "scalpels",
    name: "SCALPELS",
    color: "#FFC107",
    enabled: true,
    products: ["Disposable Scalpels", "Reusable Handles"],
    image: "/dummy-2.png",
  },
  {
    id: "sharps-safety",
    name: "SHARPS SAFETY",
    color: "#E91E63",
    enabled: true,
    products: ["Safety Scalpels", "Sharps Containers"],
    image: "/dummy-4.png",
  },
  {
    id: "wound-closure",
    name: "WOUND CLOSURE",
    color: "#FF9800",
    enabled: true,
    products: ["Sutures", "Surgical Staples"],
    image: "/dummy-1.png",
  },
  {
    id: "anesthesia-needles",
    name: "ANESTHESIA NEEDLES",
    color: "#2196F3",
    enabled: true,
    products: ["Spinal Needles", "Epidural Needles"],
    image: "/dummy-5.png",
  },
  {
    id: "blood-collection",
    name: "BLOOD COLLECTION",
    color: "#FF5722",
    enabled: true,
    products: ["Vacutainer Needles", "Collection Tubes"],
    image: "/dummy-6.png",
  },
  {
    id: "hypodermic",
    name: "HYPODERMIC",
    color: "#9C27B0",
    enabled: true,
    products: ["Hypodermic Needles", "Safety Needles"],
    image: "/dummy-7.png",
  },
];

export const productData: Record<string, Product[]> = {
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

export const getDimensions = (screenSize: string) => {
  switch (screenSize) {
    case "mobile":
      return {
        size: 380,
        centerSize: 100,
        outerRadius: 180,
        innerRadius: 50,
      };
    case "tablet":
      return { size: 450, centerSize: 180, outerRadius: 225, innerRadius: 90 };
    case "desktop":
      return { size: 600, centerSize: 240, outerRadius: 300, innerRadius: 120 };
    case "tv":
      return {
        size: 1200,
        centerSize: 360,
        outerRadius: 450,
        innerRadius: 180,
      };
    default:
      return { size: 600, centerSize: 240, outerRadius: 300, innerRadius: 120 };
  }
};
