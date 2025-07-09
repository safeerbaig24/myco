"use client";
import { useState, useEffect, useMemo } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Card, CardBody } from "@heroui/react";

interface Category {
  id: string;
  name: string;
  image: String;
  color: string;
  enabled: boolean;
}

export const updatedCategories: Category[] = [
  {
    id: "syringes",
    name: "SYRINGES",
    color: "#00BCD4",
    enabled: true,
    image: "/dummy.png",
  },
  {
    id: "blades",
    name: "BLADES",
    color: "#4CAF50",
    enabled: true,
    image: "/dummy-3.png",
  },
  {
    id: "scalpels",
    name: "SCALPELS",
    color: "#FFC107",
    enabled: true,
    image: "/dummy-2.png",
  },
  {
    id: "sharps-safety",
    name: "SHARPS SAFETY",
    color: "#E91E63",
    enabled: true,
    image: "/dummy-4.png",
  },
  {
    id: "wound-closure",
    name: "WOUND CLOSURE",
    color: "#FF9800",
    enabled: true,
    image: "/dummy-1.png",
  },
  {
    id: "anesthesia-needles",
    name: "ANESTHESIA NEEDLES",
    color: "#2196F3",
    enabled: true,
    image: "/dummy-5.png",
  },
  {
    id: "blood-collection",
    name: "BLOOD COLLECTION",
    color: "#FF5722",
    enabled: true,
    image: "/dummy-6.png",
  },
  {
    id: "hypodermic",
    name: "HYPODERMIC",
    color: "#9C27B0",
    enabled: true,
    image: "/dummy-7.png",
  },
];

export default function SettingsPage() {
  const [categories, setCategories] = useState<Category[]>(updatedCategories);

  useEffect(() => {
    const data = localStorage.getItem("categorySettings");
    if (data) {
      setCategories(JSON.parse(data));
    }
  }, [categories]);

  const toggleCategory = (categoryId: string) => {
    const index = categories.findIndex(
      (category) => category.id === categoryId
    );
    const data = categories[index];
    categories[index].enabled = !data.enabled;
    localStorage.setItem("categorySettings", JSON.stringify(categories));
    setCategories(categories);
  };

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
                      {category?.name?.slice(0, 1)}
                    </div>

                    {/* Category Info */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {category?.name}
                      </h3>
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
