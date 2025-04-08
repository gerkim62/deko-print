const CACHE_NAME = "cache-v1.3";
const OFFLINE_URL = "/offline.html";

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.add(OFFLINE_URL))
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);

  if (url.pathname === OFFLINE_URL) {
    event.respondWith(
      caches.match(OFFLINE_URL).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        // Optionally: return a fallback or do nothing
        return fetch(event.request);
      })
    );
    return;
  }

  if (
    url.origin === "https://fonts.googleapis.com" ||
    url.origin === "https://fonts.gstatic.com"
  ) {
    event.respondWith(
      caches.open("google-fonts-cache").then(async (cache) => {
        const cachedResponse = await cache.match(event.request);
        if (cachedResponse) return cachedResponse;

        const networkResponse = await fetch(event.request);
        cache.put(event.request, networkResponse.clone());
        return networkResponse;
      })
    );
  }

  event.respondWith(
    fetch(event.request).catch((error) => {
      if (event.request.mode === "navigate") {
        return caches.match(OFFLINE_URL);
      }

      // Rethrow the original error so the browser gets it
      throw error;
    })
  );
});
