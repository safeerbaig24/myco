"use client";
import { useState, useEffect } from "react";
import { Home, Settings, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@heroui/react";
import Image from "next/image";

interface NavbarProps {
  currentPage?: "home" | "settings";
}

export default function Navbar({ currentPage }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [screenSize, setScreenSize] = useState<
    "mobile" | "tablet" | "desktop" | "tv"
  >("desktop");
  const pathname = usePathname();

  // Determine current page from pathname if not provided
  const getCurrentPage = () => {
    if (currentPage) return currentPage;
    if (pathname === "/settings") return "settings";
    return "home";
  };

  const activePage = getCurrentPage();

  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth;
      if (width < 640) setScreenSize("mobile");
      else if (width < 1024) setScreenSize("tablet");
      else if (width < 1920) setScreenSize("desktop");
      else setScreenSize("tv");
    };

    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);
    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  // Close mobile menu when screen size changes
  useEffect(() => {
    if (screenSize !== "mobile") {
      setIsMobileMenuOpen(false);
    }
  }, [screenSize]);

  const getLogoSize = () => {
    switch (screenSize) {
      case "mobile":
        return {
          iconSize: "w-8 h-8",
          titleSize: "text-lg",
          subtitleSize: "text-xs",
        };
      case "tablet":
        return {
          iconSize: "w-10 h-10",
          titleSize: "text-xl",
          subtitleSize: "text-xs",
        };
      case "desktop":
        return {
          iconSize: "w-12 h-12",
          titleSize: "text-xl",
          subtitleSize: "text-xs",
        };
      case "tv":
        return {
          iconSize: "w-16 h-16",
          titleSize: "text-2xl",
          subtitleSize: "text-sm",
        };
      default:
        return {
          iconSize: "w-12 h-12",
          titleSize: "text-xl",
          subtitleSize: "text-xs",
        };
    }
  };

  const getButtonSize = () => {
    switch (screenSize) {
      case "mobile":
        return "sm";
      case "tablet":
        return "md";
      case "desktop":
        return "lg";
      case "tv":
        return "lg";
      default:
        return "lg";
    }
  };

  const logoSizes = getLogoSize();
  const buttonSize = getButtonSize();

  return (
    <nav className={`bg-white sticky top-0 z-50`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex items-center justify-between h-16 sm:h-18 lg:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center hover:opacity-80 transition-opacity"
          >
            <Image src={"/Logo.png"} alt="logo" width={153} height={80} />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-between space-x-4">
            <Link href="/">
              <Button
                variant={activePage === "home" ? "solid" : "ghost"}
                size={buttonSize}
                className={`flex items-center w-full justify-between gap-2 transition-all ${
                  activePage === "home"
                    ? "bg-[#005F9E] text-white rounded-lg font-medium"
                    : "bg-transparent text-[#005F9E] border-blue-200"
                }`}
              >
                <Home
                  className={`${screenSize === "tv" ? "w-5 h-5" : "w-4 h-4"}`}
                />
                Home
              </Button>
            </Link>
            <Link href="/settings">
              <Button
                variant={activePage === "settings" ? "solid" : "ghost"}
                size={buttonSize}
                className={`flex items-center gap-2 transition-all ${
                  activePage === "settings"
                    ? "bg-[#005F9E] text-white rounded-lg font-medium"
                    : "bg-transparent text-[#005F9E] border-blue-200"
                }`}
              >
                <Settings
                  className={`right-0 ${
                    screenSize === "tv" ? "w-5 h-5" : "w-4 h-4"
                  }`}
                />
                Settings
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="solid"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="bg-transparent border-blue-200 text-[#005F9E] hover:bg-blue-50"
            >
              {isMobileMenuOpen ? (
                <X className="w-4 h-4" />
              ) : (
                <Menu className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-2 pt-2 pb-3 space-y-2">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                <Button
                  variant={activePage === "home" ? "solid" : "ghost"}
                  size="sm"
                  className={`w-full justify-start gap-3 transition-all ${
                    activePage === "home"
                      ? "bg-[#005F9E] hover:bg-blue-700 text-white"
                      : "text-[#005F9E] hover:bg-blue-50"
                  }`}
                >
                  <Home className="w-4 h-4" />
                  Home
                </Button>
              </Link>
              <Link href="/settings" onClick={() => setIsMobileMenuOpen(false)}>
                <Button
                  variant={activePage === "settings" ? "solid" : "ghost"}
                  size="sm"
                  className={`w-full justify-start gap-3 transition-all ${
                    activePage === "settings"
                      ? "bg-[#005F9E] hover:bg-blue-700 text-white"
                      : "text-[#005F9E] hover:bg-blue-50"
                  }`}
                >
                  <Settings className="w-4 h-4" />
                  Settings
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
