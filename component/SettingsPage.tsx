"use client";
import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Card, CardBody } from "@heroui/react";

interface Category {
  id: string;
  name: string;
  displayName: string;
  description: string;
  color: string;
  enabled: boolean;
  icon: string;
}

const initialCategories: Category[] = [
  {
    id: "syringes",
    name: "SYRINGES",
    displayName: "Syringes",
    description: "High-precision syringes for medical applications",
    color: "#00BCD4",
    enabled: true,
    icon: "S",
  },
  {
    id: "scalpels",
    name: "SCALPELS",
    displayName: "Scalpels",
    description: "Professional surgical scalpels and blades",
    color: "#FFC107",
    enabled: false,
    icon: "S",
  },
  {
    id: "blades",
    name: "BLADES",
    displayName: "Blades",
    description: "Precision cutting blades for various procedures",
    color: "#7CB342",
    enabled: true,
    icon: "B",
  },
  {
    id: "sharps-safety",
    name: "SHARPS SAFETY",
    displayName: "Catheters",
    description: "Advanced catheter systems",
    color: "#E91E63",
    enabled: true,
    icon: "C",
  },
  {
    id: "wound-closure",
    name: "WOUND CLOSURE",
    displayName: "Electrodes",
    description: "High-quality electrodes for diagnostics",
    color: "#FF9800",
    enabled: true,
    icon: "E",
  },
  {
    id: "anesthesia-needles",
    name: "ANESTHESIA NEEDLES",
    displayName: "Monitors",
    description: "Patient monitoring equipment",
    color: "#2196F3",
    enabled: true,
    icon: "M",
  },
];

export default function SettingsPage() {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Load settings from localStorage if available
    const savedSettings = localStorage.getItem("categorySettings");
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setCategories(parsed);
      } catch (error) {
        console.error("Error loading settings:", error);
      }
    }
  }, []);

  useEffect(() => {
    // Save settings to localStorage whenever categories change
    if (mounted) {
      localStorage.setItem("categorySettings", JSON.stringify(categories));
    }
  }, [categories, mounted]);

  const toggleCategory = (categoryId: string) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === categoryId ? { ...cat, enabled: !cat.enabled } : cat
      )
    );
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Settings Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Page Header */}
        <div className="mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Settings
          </h1>
          <p className="text-base sm:text-lg text-blue-600">
            Manage product categories and their visibility on the category
            wheel.
          </p>
        </div>

        {/* Categories Section */}
        <Card className="bg-white shadow-sm">
          <CardBody className="p-0">
            {/* Section Header */}
            <div className="bg-blue-50 px-6 py-4 border-b">
              <h2 className="text-xl font-semibold text-blue-800">
                Existing Categories
              </h2>
            </div>

            {/* Categories List */}
            <div className="divide-y divide-gray-200">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="px-6 py-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    {/* Category Icon */}
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
                      style={{ backgroundColor: category.color }}
                    >
                      {category.icon}
                    </div>

                    {/* Category Info */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {category.displayName}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {category.description}
                      </p>
                    </div>
                  </div>

                  {/* Visibility Toggle */}
                  <button
                    onClick={() => toggleCategory(category.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      category.enabled
                        ? "text-green-600 hover:bg-green-50"
                        : "text-gray-400 hover:bg-gray-100"
                    }`}
                    title={category.enabled ? "Hide category" : "Show category"}
                  >
                    {category.enabled ? (
                      <Eye className="w-6 h-6" />
                    ) : (
                      <EyeOff className="w-6 h-6" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
