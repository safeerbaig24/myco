"use client";

import { usePWAInstall } from "../ulits/hooks";

export default function InstallAlert() {
  const { isInstallable, installApp } = usePWAInstall();

  if (!isInstallable) return null;

  return (
    <div className="fixed top-0 left-0 w-full bg-blue-600 text-white p-3 z-50 flex justify-between items-center shadow-md">
      <span>📱 Install this app for a better experience.</span>
      <button
        onClick={installApp}
        className="bg-white text-blue-600 px-3 py-1 rounded font-medium hover:bg-gray-100"
      >
        Install
      </button>
    </div>
  );
}
