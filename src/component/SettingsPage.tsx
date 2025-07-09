import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Card, CardBody } from "@heroui/react";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>(updatedCategories);
  const [password, setPassword] = useState<string>(""); // For password input
  const [isPasswordCorrect, setIsPasswordCorrect] = useState<boolean>(false); // To track password status // Show password modal on first load

  useEffect(() => {
    const data = localStorage.getItem("categorySettings");
    if (data) {
      setCategories(JSON.parse(data));
    }
  }, []);

  const toggleCategory = (categoryId: string) => {
    const index = categories.findIndex(
      (category) => category.id === categoryId
    );
    const data = categories[index];
    categories[index].enabled = !data.enabled;
    localStorage.setItem("categorySettings", JSON.stringify(categories));
    setCategories(categories);
  };

  const handlePasswordSubmit = () => {
    const correctPassword = "yourPassword"; // Replace with your actual password
    if (password === correctPassword) {
      setIsPasswordCorrect(true);
    } else {
      alert("Incorrect password. Please try again.");
    }
  };

  if (!isPasswordCorrect) {
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-gray-200 bg-opacity-50">
        <div className="bg-white py-12 px-[28px] rounded-lg shadow-md max-w-sm w-full relative">
          <img
            src="/cross.png"
            alt="cross"
            width={10}
            height={10}
            className="absolute right-[28px] top-5 cursor-pointer"
            onClick={() => navigate("/")}
          />
          <h2 className="text-base text-[#484848] font-semibold mb-2">
            Password
          </h2>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full p-2 mb-4 border border-[#48484833] rounded-md placeholder:text-[#48484833] placeholder:text-sm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={handlePasswordSubmit}
            className="w-full bg-[#005F9E] text-white p-2 text-base font-medium rounded-md"
          >
            Submit
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Settings Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Page Header */}
        <div className="mb-8 sm:mb-12">
          <h1 className="text-[28px] sm:text-4xl font-bold text-[#005F9E] mb-4">
            Settings
          </h1>
          <p className="text-base sm:text-lg text-[#005F9E]">
            Manage product categories and their visibility on the category
            wheel.
          </p>
        </div>

        {/* Categories Section */}
        <Card className="bg-white shadow-sm">
          <CardBody className="p-0">
            {/* Section Header */}
            <div className="bg-[#005F9E1A] px-6 py-5 border-b">
              <h2 className="text-[22px] font-medium text-[#005F9E]">
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
                  <div className="flex items-center gap-2">
                    {/* Category Icon */}
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
                      style={{ backgroundColor: "#005F9E" }}
                    >
                      {category?.name?.slice(0, 1)}
                    </div>

                    {/* Category Info */}
                    <div>
                      <h3 className="text-lg font-medium text-[#005F9E]">
                        {category?.name}
                      </h3>
                      <p className="text-sm text-[#48484880]">
                        High-precision syringes for medical applications
                      </p>
                    </div>
                  </div>

                  {/* Visibility Toggle */}
                  <div className="flex items-center gap-[26px]">
                    <button
                      onClick={() => toggleCategory(category.id)}
                      className={`p-2 rounded-lg transition-colors ${
                        category.enabled
                          ? "text-green-600 hover:bg-green-50"
                          : "text-gray-400 hover:bg-gray-100"
                      }`}
                      title={
                        category.enabled ? "Hide category" : "Show category"
                      }
                    >
                      {category.enabled ? (
                        <Eye className="w-6 h-6" />
                      ) : (
                        <EyeOff className="w-6 h-6" />
                      )}
                    </button>
                    <img src="/down.png" width={15} height={15} />
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
