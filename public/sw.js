const CACHE = "energomanager-v1";
self.addEventListener("install", (e) => {
e.waitUntil((async () => {
const cache = await caches.open(CACHE);
await cache.addAll(["./", "./index.html"]);
})());
});
self.addEventListener("fetch", (e) => {
e.respondWith((async () => {
const res = await caches.match(e.request);
return res || fetch(e.request);
})());
});
