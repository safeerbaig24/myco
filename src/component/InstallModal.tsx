// src/component/InstallModal.tsx
"use client";
import { useState } from "react";
import { usePWAInstall } from "../ulits/hooks";

export default function InstallModal() {
  const { isInstallable, installApp } = usePWAInstall();
  const [isVisible, setIsVisible] = useState(true);

  console.log(isInstallable, isVisible, "111");

  if (!isInstallable || !isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-start justify-center">
      <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm w-full text-center">
        <h2 className="text-xl font-bold text-blue-600 mb-2">
          Install Our App
        </h2>
        <p className="text-gray-700 mb-4">
          For a better experience, install this app to your device.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={installApp}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Install
          </button>
          <button
            onClick={() => setIsVisible(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
}
