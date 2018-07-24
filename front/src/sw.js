let staticCacheName = "udacity-mws-restaurants-v5";
self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
      return cache.addAll([
        "/",
        "/sw.js",
        "index.html",
        "restaurant.html",
        "assets/css/styles.css",
        "assets/js/dbhelper.js",
        "assets/js/main.js",
        "assets/js/restaurant_info.js",
        "assets/data/restaurants.json",
        "assets/images/1-desktop.jpg",
        "assets/images/1-mobile.jpg",        "assets/images/1-tablet.jpg",        "assets/images/2-desktop.jpg",
        "assets/images/2-mobile.jpg",        "assets/images/2-tablet.jpg",        "assets/images/3-desktop.jpg",
        "assets/images/3-mobile.jpg",        "assets/images/3-tablet.jpg",        "assets/images/4-desktop.jpg",
        "assets/images/4-mobile.jpg",        "assets/images/4-tablet.jpg",        "assets/images/5-desktop.jpg",
        "assets/images/5-mobile.jpg",        "assets/images/5-tablet.jpg",        "assets/images/6-desktop.jpg",
        "assets/images/6-mobile.jpg",        "assets/images/6-tablet.jpg",        "assets/images/7-desktop.jpg",
        "assets/images/7-mobile.jpg",        "assets/images/7-tablet.jpg",        "assets/images/8-desktop.jpg",
        "assets/images/8-mobile.jpg",        "assets/images/8-tablet.jpg",        "assets/images/9-desktop.jpg",
        "assets/images/9-mobile.jpg",        "assets/images/9-tablet.jpg",        "assets/images/10-desktop.jpG",
        "assets/images/10-mobile.jpg",
        "assets/images/10-tablet.jpg"
        // "https://maps.googleapis.com/maps/api/js?key=AIzaSyACGz0tWs__s2RqU_lZ5dZc3PYTYn-O7-E&libraries=places&callback=initMap"
      ]);
    })
  );
});
self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames
          .filter(function(cacheName) {
            return (
              cacheName.startsWith("udacity-") && cacheName != staticCacheName
            );
          })
          .map(function(cacheName) {
            return caches.delete(cacheName);
          })
      );
    })
  );
});
self.addEventListener("fetch", function(event) {
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


