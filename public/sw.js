// public/sw.js
self.addEventListener("install", () => {
  console.log("✅ Service Worker installed");
  self.skipWaiting();
});

self.addEventListener("activate", () => {
  console.log("✅ Service Worker activated");
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(fetch(event.request));
});
