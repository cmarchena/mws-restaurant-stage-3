#Review
April 10th 2018

##A11y

- [x] We need to improve the implementation of breadcrumb. Please check code review section for more information.

##Offline Availability 

- [x] We should add index.html & restaurant.html to the cache.
- [x] We must cache individual images as the cache can only add files & not directories.
- [x] We do not need to cache this URL(map).
- [x] We need to dynamically handle the requests for restaurant.html?id=x as the service worker matches the url of the file to the cache, with restaurant.html & restaurant.html?id=x not matching the page will not load in offline mode.


