let staticCacheName = "udacity-mws-restaurants-v1";
const urls = [
  "/",
  "/sw.js",
  "index.html",
  "restaurant.html",
  "assets/css/styles.css",
  "assets/js/dbhelper.js",
  "assets/js/main.js",
  "assets/js/restaurant_info.js",
  "assets/fonts/Inconsolata-Regular.ttf",
  "assets/fonts/Inconsolata-Bold.ttf",
  "assets/img/1-desktop.webp",
  "assets/img/2-desktop.webp",
  "assets/img/3-desktop.webp",
  "assets/img/4-desktop.webp",
  "assets/img/5-desktop.webp",
  "assets/img/6-desktop.webp",
  "assets/img/7-desktop.webp",
  "assets/img/8-desktop.webp",
  "assets/img/9-desktop.webp",
  "assets/img/10-desktop.webp",
  "assets/img/1-tablet.webp",
  "assets/img/2-tablet.webp",
  "assets/img/3-tablet.webp",
  "assets/img/4-tablet.webp",
  "assets/img/5-tablet.webp",
  "assets/img/6-tablet.webp",
  "assets/img/7-tablet.webp",
  "assets/img/8-tablet.webp",
  "assets/img/9-tablet.webp",
  "assets/img/10-tablet.webp",
  "assets/img/4-mobile.webp",
  "assets/img/7-mobile.webp",
  "assets/img/9-mobile.webp",
  "assets/img/10-mobile.webp",



  // "https://maps.googleapis.com/maps/api/js?key=AIzaSyACGz0tWs__s2RqU_lZ5dZc3PYTYn-O7-E&libraries=places&callback=initMap"
]
self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(staticCacheName).then(function (cache) {
      return cache.addAll(urls);
    })
  );
});
self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames
        .filter(function (cacheName) {
          return (
            cacheName.startsWith("udacity-") && cacheName != staticCacheName
          );
        })
        .map(function (cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});
self.addEventListener("fetch", function (event) {
  const url = new URL(event.request.url);
  if (url.pathname === "/") {
    event.respondWith(caches
      .match("index.html")
      .then(response => response || fetch(event.request)));
    return;
  }

  if (url.pathname.startsWith("/restaurant.html")) {
    event.respondWith(caches
      .match("restaurant.html")
      .then(response => response || fetch(event.request)));
    return;
  }
  // else {
  //   event.respondWith(caches
  //       .match(event.request)
  //       .then(function(response) {
  //         return response || fetch(event.request);
  //       }));
  // }    
});