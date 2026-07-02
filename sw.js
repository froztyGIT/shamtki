const CACHE_NAME = "shmatky-v1-3";

const FILES = [
  "./",
  "./index.html",
  "./manifest.json",

  "./apple-touch-icon.png",

  "./favicon.ico",
  "./favicon-16x16.png",
  "./favicon-32x32.png",
  "./favicon-48x48.png",

  "./icon-192.png",
  "./icon-512.png",
  "./icon-1024.png"
];

self.addEventListener("install", (event) => {
  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES))
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );

  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});