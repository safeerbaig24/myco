"use client";
import type React from "react";
import { useState, useEffect } from "react";
import WheelContainer from "./WheelContainer";
import { categories, type Category, getDimensions } from "../ulits/staticData";
import { Image } from "@heroui/react";

export default function RadialProductWheel() {
  const [rotation, setRotation] = useState(0);
  const [screenSize, setScreenSize] = useState<
    "mobile" | "tablet" | "desktop" | "tv"
  >("desktop");

  const [updatedCategories, setUpdatedCategories] = useState<Category[]>([]);

  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      console.log(height);

      if (width < 640) setScreenSize("mobile");
      else if (width < 1024) setScreenSize("tablet");
      else if (width <= 1920) setScreenSize("desktop");
      else if (width > 1920) setScreenSize("tv");
      else setScreenSize("desktop");
    };

    const savedSettings = localStorage?.getItem("categorySettings");

    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setUpdatedCategories(
          parsed?.filter((data: Category) => data?.enabled == true)
        );
      } catch (error) {
        setUpdatedCategories(categories);
        localStorage.setItem("categorySettings", JSON.stringify(categories));
      }
    } else {
      setUpdatedCategories(categories);
      localStorage.setItem("categorySettings", JSON.stringify(categories));
    }
    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);
    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  const dimensions = getDimensions(screenSize);
  const segmentAngle =
    360 / updatedCategories?.filter((data) => data?.enabled == true)?.length;

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 5 : -5;
    setRotation((prev) => prev + delta);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = touch.clientX - centerX;
      const deltaY = touch.clientY - centerY;
      const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
      setRotation(angle);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (screenSize === "tv") {
        switch (e.key) {
          case "ArrowLeft":
            e.preventDefault();
            setRotation((prev) => prev - 45);
            break;
          case "ArrowRight":
            e.preventDefault();
            setRotation((prev) => prev + 45);
            break;
          case "Enter":
          case " ":
            e.preventDefault();
            // Navigate to first visible category
            if (categories.length > 0) {
              window.location.href = `/products/${categories[0].id}`;
            }
            break;
        }
      }
    };

    if (screenSize === "tv") {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [screenSize, categories]);

  return (
    <div className=" bg-white min-h-screen flex flex-col pt-[60px] px-6 lg:px-[160px]">
      <div
        className="w-full rounded-[52px] py-10 md:py-[64px]"
        style={{
          background:
            "linear-gradient(180deg, rgba(0, 95, 158, 0.2) 0%, rgba(245, 127, 38, 0.2) 100%)",
        }}
      >
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h1 className="text-2xl sm:text-3xl lg:text-[32px] text-[#005F9E] px-4 md:px-0 max-w-[599px] mx-auto font-bold mb-2">
            Your Trusted Supplier for Medical Devices & Disposables
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-[#005F9E] mb-5">
            Delivering high-quality medical supplies to health systems
            nationwide for 30+ years
          </p>
        </div>

        {/* Radial Wheel */}
        <div className="flex flex-col items-center justify-center">
          <div
            className="relative cursor-pointer select-none touch-none"
            style={{
              width: dimensions.size,
              height: dimensions.size,
              filter: "drop-shadow(0 10px 25px rgba(0,0,0,0.15))",
            }}
            onWheel={handleWheel}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
          >
            {/* Wheel Container */}
            <WheelContainer
              rotation={rotation}
              categories={updatedCategories}
              segmentAngle={segmentAngle}
              dimensions={dimensions}
              screenSize={screenSize}
            />

            {/* Center Circle */}
            <div
              className="absolute bg-white rounded-full border-4 border-gray-200 flex items-center justify-center overflow-hidden"
              style={{
                width: dimensions.centerSize,
                height: dimensions.centerSize,
                left: "50%",
                top: "50%",
                marginLeft: -dimensions.centerSize / 2,
                marginTop: -dimensions.centerSize / 2,
                backgroundImage: "url('/myco-center-logo.png')",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            >
              <Image
                src={"/Logo.png"}
                alt="logo"
                className="w-14 h-14 lg:w-[150px] lg:h-[100px]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
