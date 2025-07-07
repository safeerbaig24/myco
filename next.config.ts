import { heroui } from "@heroui/react";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   content: [
    // ...
    // make sure it's pointing to the ROOT node_module
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [heroui()],
};

export default nextConfig;
