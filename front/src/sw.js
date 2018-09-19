/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js");

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "808f893fcb72fb6b64cc218879dcc588"
  },
  {
    "url": "assets/fonts/Inconsolata-Bold.ttf",
    "revision": "b0312789bfb46bc4570209693d0bf28f"
  },
  {
    "url": "assets/fonts/Inconsolata-Regular.ttf",
    "revision": "29b00ebcf93fda46ac9957fa4816eafd"
  },
  {
    "url": "assets/images/1-desktop.jpg",
    "revision": "3a82f0cf70611fff1b945597f84d1923"
  },
  {
    "url": "assets/images/1-desktop.webp",
    "revision": "0d990c177ef69ee47d6ad1edfd396467"
  },
  {
    "url": "assets/images/1-mobile.webp",
    "revision": "306b8f69a83bc1d8ec0a3363300ed129"
  },
  {
    "url": "assets/images/1-tablet.jpg",
    "revision": "13d93174bb019691c3420ee88e40043d"
  },
  {
    "url": "assets/images/1-tablet.webp",
    "revision": "306b8f69a83bc1d8ec0a3363300ed129"
  },
  {
    "url": "assets/images/10-desktop.jpg",
    "revision": "e4c07d47d384b2b8f90fe7d205c07dab"
  },
  {
    "url": "assets/images/10-desktop.webp",
    "revision": "3286a2c986328d44b69613beb317e6af"
  },
  {
    "url": "assets/images/10-mobile.webp",
    "revision": "25d2898f76c19708988cea24537769d3"
  },
  {
    "url": "assets/images/10-tablet.jpg",
    "revision": "e80ff4184aef363208449774550e720c"
  },
  {
    "url": "assets/images/10-tablet.webp",
    "revision": "b96c1d2ffb6709db1aae1a1973255a9c"
  },
  {
    "url": "assets/images/2-desktop.jpg",
    "revision": "02284fca09bfb9e6e76c1198e4544fc0"
  },
  {
    "url": "assets/images/2-desktop.webp",
    "revision": "9448469c34964bc900a5bcb901ec34c7"
  },
  {
    "url": "assets/images/2-mobile.webp",
    "revision": "33ad7150253d44d1bc1e593846cf68d1"
  },
  {
    "url": "assets/images/2-tablet.jpg",
    "revision": "1b29ece1b6539f3783d8eecf3bfe24e3"
  },
  {
    "url": "assets/images/2-tablet.webp",
    "revision": "33ad7150253d44d1bc1e593846cf68d1"
  },
  {
    "url": "assets/images/3-desktop.jpg",
    "revision": "4c3af26775785221b8fffac20c801394"
  },
  {
    "url": "assets/images/3-desktop.webp",
    "revision": "7645082f09020dbc49e9933226f1a05d"
  },
  {
    "url": "assets/images/3-mobile.webp",
    "revision": "537672884000afb384cedb20b0686f00"
  },
  {
    "url": "assets/images/3-tablet.jpg",
    "revision": "8c5c38b165c78a3a3246093db1b8c2b5"
  },
  {
    "url": "assets/images/3-tablet.webp",
    "revision": "537672884000afb384cedb20b0686f00"
  },
  {
    "url": "assets/images/4-desktop.jpg",
    "revision": "75c5d53cd4f7dce5abdd0311bade85cf"
  },
  {
    "url": "assets/images/4-desktop.webp",
    "revision": "6f72762091f2f9b641ad5a288f77da5c"
  },
  {
    "url": "assets/images/4-mobile.webp",
    "revision": "7f4f480618894d5e1eaa141fca5eeac3"
  },
  {
    "url": "assets/images/4-tablet.jpg",
    "revision": "5631c2c69f290681082a0b343d93102b"
  },
  {
    "url": "assets/images/4-tablet.webp",
    "revision": "8d0c2387480b9239b560b226f9ca3931"
  },
  {
    "url": "assets/images/5-desktop.jpg",
    "revision": "11fdf1490f2d0ea015f4d8f449a6bbc2"
  },
  {
    "url": "assets/images/5-desktop.webp",
    "revision": "a262848ab0df91eaf82a54e7904aeca1"
  },
  {
    "url": "assets/images/5-mobile.webp",
    "revision": "46aa8c1f9f779a98d845e3d7b4e77ee5"
  },
  {
    "url": "assets/images/5-tablet.jpg",
    "revision": "6d9147107e3590482875505ab2019dc6"
  },
  {
    "url": "assets/images/5-tablet.webp",
    "revision": "46aa8c1f9f779a98d845e3d7b4e77ee5"
  },
  {
    "url": "assets/images/6-desktop.jpg",
    "revision": "10607064ac91343d9ffe7d16ae1fde08"
  },
  {
    "url": "assets/images/6-desktop.webp",
    "revision": "47f9fc1fd95a123e01977cbdb89e5ee9"
  },
  {
    "url": "assets/images/6-mobile.webp",
    "revision": "376449d382a7b745e28bcbf31cbd1402"
  },
  {
    "url": "assets/images/6-tablet.jpg",
    "revision": "ec8fcc4f6c729f3d717d9a29f5680312"
  },
  {
    "url": "assets/images/6-tablet.webp",
    "revision": "376449d382a7b745e28bcbf31cbd1402"
  },
  {
    "url": "assets/images/7-desktop.jpg",
    "revision": "712e2476c418f3e1ec6e394a5cf9477f"
  },
  {
    "url": "assets/images/7-desktop.webp",
    "revision": "a9a610fcf48303ce6a5a924ad8bc4ae7"
  },
  {
    "url": "assets/images/7-mobile.webp",
    "revision": "458be9790249e01627ce296982a30059"
  },
  {
    "url": "assets/images/7-tablet.jpg",
    "revision": "aa268769323d65022d28b773b3240fe3"
  },
  {
    "url": "assets/images/7-tablet.webp",
    "revision": "7676fdc4f069f0c9d13ee0fa244c6253"
  },
  {
    "url": "assets/images/8-desktop.jpg",
    "revision": "807956195f38f47baea39f803600daef"
  },
  {
    "url": "assets/images/8-desktop.webp",
    "revision": "716964b8509a15fcc439760c0b2da77a"
  },
  {
    "url": "assets/images/8-mobile.webp",
    "revision": "2d142eff9f150822c4c1ce2fb8c37ffd"
  },
  {
    "url": "assets/images/8-tablet.jpg",
    "revision": "fdb5fdd335cf1e5f89ffc17e826bd596"
  },
  {
    "url": "assets/images/8-tablet.webp",
    "revision": "2d142eff9f150822c4c1ce2fb8c37ffd"
  },
  {
    "url": "assets/images/9-desktop.jpg",
    "revision": "f6b0a32c356cb0f80c9cf68e434fb80e"
  },
  {
    "url": "assets/images/9-desktop.webp",
    "revision": "108f60b401c6794dd137978d62089ea4"
  },
  {
    "url": "assets/images/9-mobile.webp",
    "revision": "2c835abf9d13da67ace53e68c22f8b31"
  },
  {
    "url": "assets/images/9-tablet.jpg",
    "revision": "aa69c8a6da5918a8c7619876d7851b33"
  },
  {
    "url": "assets/images/9-tablet.webp",
    "revision": "c130759e0f99309a192935bf4c0ce4a6"
  },
  {
    "url": "assets/images/icon1.webp",
    "revision": "a9535d3994aa43500e044d4cc264c0e8"
  },
  {
    "url": "assets/images/icon2.webp",
    "revision": "c1ffe4c90744a18a2042bc18b7f60ebd"
  },
  {
    "url": "assets/images/no-fav.svg",
    "revision": "456dd056844078229a3211241f99bd66"
  },
  {
    "url": "assets/images/no-fav.webp",
    "revision": "7dc25071f4e9a787113a984b020ec94c"
  },
  {
    "url": "assets/images/yes-fav.svg",
    "revision": "7544f815d5873169eb84b50f8a78e416"
  },
  {
    "url": "assets/js/dbhelper.ts",
    "revision": "d5917b259564eb9a312ddf4cfdf8b2c2"
  },
  {
    "url": "assets/js/index.ts",
    "revision": "86711913ee867ebc3c224f8de64c628a"
  },
  {
    "url": "assets/js/interfaces.ts",
    "revision": "1a3440b3d748137414ce53b844e6f163"
  },
  {
    "url": "assets/js/map.ts",
    "revision": "d76403a44a69c08f7f6dc55d3322e655"
  },
  {
    "url": "assets/js/restaurant-detail.ts",
    "revision": "3923d70e18776d79140d8b6fff34eb70"
  },
  {
    "url": "assets/sass/styles.scss",
    "revision": "0c078b94f7157f9d0fe8000ae70fa16c"
  },
  {
    "url": "index.html",
    "revision": "335ab585f5e5ceb08e734f245b97044e"
  },
  {
    "url": "manifest.json",
    "revision": "ea9c614f529e6807f7c941a54dc4269d"
  },
  {
    "url": "offline.html",
    "revision": "c9431d780ab7bcbfddb41f0d1367a6e1"
  },
  {
    "url": "restaurant.html",
    "revision": "f5604495783863c04548c3bb58979ee2"
  },
  {
    "url": "sw-2.js",
    "revision": "cd327d6f8b1bd5b2c6564347066193fb"
  },
  {
    "url": "sw-copy.js",
    "revision": "c97c3788b0c3ff06026659575edbac0b"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});


workbox.routing.registerRoute(
  '/index.html',
  workbox.strategies.StaleWhileRevalidate(),
);

workbox.routing.registerRoute(
  'https://mws-project-3.herokuapp.com/restaurants',
  workbox.strategies.StaleWhileRevalidate(),
);
