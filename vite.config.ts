import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import tailwindcss from "@tailwindcss/vite";
// import { fileURLToPath } from "url";
// import path from "path";

// ✅ Resolve __dirname for ESM
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      // includeAssets: ["favicon.ico", "Logo.png", "apple-touch-icon.png"],
      manifest: {
        name: "MYCO Medical Product Wheel",
        short_name: "MYCO",
        description: "Interactive product wheel for MYCO Medical",
        theme_color: "#2563eb",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      includeAssets: [
        "favicon.ico",
        "apple-touch-icon.png",
        "icon-192x192.png",
        "icon-512x512.png",
        "Logo.png",
      ],
    }),
  ],
  server: {
    allowedHosts: ["0a42f3b0347c.ngrok-free.app"],
    host: true,
    port: 5173,
  },
  resolve: {
    alias: {
      "@": "./src",
    },
  },
});
