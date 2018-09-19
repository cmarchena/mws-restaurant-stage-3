
import DBHelper from "./dbhelper";
import { Restaurant } from "./interfaces";
import map from "./map";
// Service Worker
// Check that service workers are registered
if ("serviceWorker" in navigator) {
    // Use the window load event to keep the page load performant
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("/sw.js");
    });
}

// End Service Worker


/**
 * Fetch neighborhoods and cuisines as soon as the page is loaded.
 */
document.addEventListener("DOMContentLoaded", (event) => {
    if (document.title === "Restaurant Reviews") {
        indexPage();

    }
});
let locations: string[] = [];

/**
 * Fetch all neighborhoods and set their HTML.
 */

const indexPage = () => {
    initialLoad();
    fetchNeighborhoods();
    fetchCuisines();
    fillRestaurantsHTML("", "");
    updateRestaurants();

};
const initialLoad = () => {
    DBHelper.storedRestaurants();
}
const fetchNeighborhoods = () => {
    DBHelper.readAllRestaurants().then((restaurants: Restaurant[]) => {

        const neighborhoods = restaurants.map((restaurant: Restaurant) => restaurant.neighborhood);
        // Remove duplicates from neighborhoods;
        const neighborhoodSet = new Set(neighborhoods);
        const uniqueNeighborhoods = Array.from(neighborhoodSet);

        return uniqueNeighborhoods;

    }).then((uniqueNeighborhoods) => fillNeighborhoodsHTML(uniqueNeighborhoods));
};

/**
 * Set neighborhoods HTML.
 */
const fillNeighborhoodsHTML = (neighborhoods: any) => {
    const select = document.getElementById("neighborhoods-select");
    neighborhoods.map((neighborhood: any) => {
        const option = document.createElement("option");
        option.innerHTML = neighborhood;
        option.value = neighborhood;
        select.appendChild(option);

    });

};

/**
 * Fetch all cuisines and set their HTML.
 */
const fetchCuisines = () => {
    DBHelper.readAllRestaurants().then((restaurants: Restaurant[]) => {
        const cuisines = restaurants.map((restaurant: Restaurant) => restaurant.cuisine_type);
        // Remove duplicates from neighborhoods;
        const cuisineSet = new Set(cuisines);
        const uniqueCuisines = Array.from(cuisineSet);
        return uniqueCuisines;

    }).then((uniqueCuisines) => fillCuisinesHTML(uniqueCuisines));

};

/**
 * Set cuisines HTML.
 */
const fillCuisinesHTML = (cuisines: any) => {
    const select = document.getElementById("cuisines-select");

    cuisines.map((cuisine: any) => {
        const option = document.createElement("option");
        option.innerHTML = cuisine;
        option.value = cuisine;
        select.appendChild(option);
    });

};

/**
 * Initialize Google map, called from HTML.
 */

const updateRestaurants = () => {

    const state = {
        cuisine: "",
        neighborhood: "",
    };
    const fetchCuisine =
        document.getElementById("cuisines-select").addEventListener("change", (e) => {
            const cuisine = (e.target as HTMLSelectElement).value;
            state.cuisine = cuisine;
            changeDOM();

        });

    const fetchNeighborhood = document.getElementById("neighborhoods-select").addEventListener("change", (e) => {
        const neighborhood = (e.target as HTMLSelectElement).value;
        state.neighborhood = neighborhood;
        changeDOM();

    });

    const changeDOM = () => {

        document.getElementById("restaurants-list").innerHTML = "";
        fillRestaurantsHTML(state.cuisine, state.neighborhood);
        locations = [];

    };
};

const fillRestaurantsHTML = (cuisine: any, neighborhood: any) => {
    window.addEventListener('offline', function (e) {
        const el = document.getElementById("header");
        const p = document.createElement('p')
        p.innerText = "You're currently online";
        el.appendChild(p)

    })
    DBHelper.readAllRestaurants().then((restaurants: any) => {

        const ul = document.getElementById("restaurants-list");
        const selectedNeighborhood = neighborhood;
        const selectedCuisine = cuisine;
        const filteredRestaurants =
            (!selectedCuisine && !selectedNeighborhood) ?
                restaurants :
                (selectedCuisine && selectedNeighborhood) ?
                    restaurants.filter((restaurant: any) => {
                        return restaurant.neighborhood === selectedNeighborhood;
                    }).filter(
                        (restaurant: any) => restaurant.cuisine_type === selectedCuisine,
                    ) :
                    (selectedCuisine || selectedNeighborhood) ?
                        restaurants.filter((restaurant: any) => {
                            return restaurant.neighborhood === selectedNeighborhood || restaurant.cuisine_type === selectedCuisine;
                        })
                        : restaurants;

        if (filteredRestaurants.length === 0) {

            const p = document.createElement("p");
            p.innerHTML = "There is no restaurants matching your criteria. Try again a broader selection";
            ul.insertAdjacentElement("afterbegin", p);
            locations = [];
            showMap(locations);
        } else {

            filteredRestaurants.map((restaurant: Restaurant) => {
                locations.push(restaurant.latlng);
                ul.appendChild(createRestaurantHTML(restaurant));

                return locations;

            });

            showMap(locations);
        }


    });
};

/**
 * Create restaurant HTML.
 */
const createRestaurantHTML = (restaurant: Restaurant) => {
    console.log(restaurant.name, restaurant.is_favorite);
    const li = document.createElement("li");
    li.className = "card";
    const picture = document.createElement("picture");
    const srcsetDesktop = `images/${restaurant.photograph}-desktop.webp`;
    const srcsetTablet = `images/${restaurant.photograph}-tablet.webp`;
    const srcsetMobile = `images/${restaurant.photograph}-mobile.webp`;
    const srcsetFallback = `images/${restaurant.photograph}-tablet.jpg`;
    picture.innerHTML = `<source media="(min-width: 1024px)" srcset="${srcsetDesktop}" type="image/webp">
  <source media="(min-width: 728px)" srcset="${srcsetTablet}" type="image/webp">
  <source media="(max-width: 727px)" srcset="${srcsetMobile}" type="image/webp">
  <source  srcset="${srcsetFallback}" type="image/jpeg">
  <img src="${srcsetFallback}" class="restaurant-img" alt="${restaurant.name} ${restaurant.cuisine_type} food restaurant New York City">`;

    li.appendChild(picture);
    // TODO PROJECT REVIEW
    // Correct restaurant's name semantic mistake in index.html

    const name = document.createElement("h3");
    name.innerHTML = restaurant.name;
    li.appendChild(name);
    const fav = document.createElement("span");
    const isFav = restaurant.is_favorite;
    const restId = restaurant.id;
    if (isFav === "true") {
        fav.classList.add("yes-fav");
        fav.classList.remove("no-fav");
        fav.setAttribute("aria-label", "marked as favorite");
    } else {
        fav.classList.add("no-fav");
        fav.classList.remove("yes-fav");
        fav.setAttribute("aria-label", "marked as no favorite");
    }

    window.addEventListener('online', function (e) {
        console.log('online');
        if (isFav === "true") {
            fav.classList.add("yes-fav");
            fav.classList.remove("no-fav");
            fav.setAttribute("aria-label", "marked as favorite");
        } else {
            fav.classList.add("no-fav");
            fav.classList.remove("yes-fav");
            fav.setAttribute("aria-label", "marked as no favorite");
        }


    });
    /* window.addEventListener('offline', function (e) {
        console.log('offline');
        if (isFav === "true") {

            fav.classList.add("yes-fav-offline");
            fav.setAttribute("tooltip", "tooltip");
            fav.setAttribute("tooltip-position", "right");
            fav.classList.remove("no-fav");
            fav.setAttribute("aria-label", "marked as favorite, currently offline");

        } else {
            fav.classList.add("no-fav-offline");
            fav.setAttribute("tooltip", "tooltip");
            fav.setAttribute("tooltip-position", "right");
            fav.classList.remove("yes-fav");
            fav.setAttribute("aria-label", "marked as no favorite, currently offline");

        }

    }); */

    const toggleFav = () => {
        if (fav.className === "no-fav") {

            DBHelper.updateFav(restId, 'true');

            fav.classList.replace("no-fav", "yes-fav");
            fav.removeAttribute("aria-label");
            fav.setAttribute("aria-label", "marked as favorite");
        } else {

            DBHelper.updateFav(restId, 'false');

            fav.classList.replace("yes-fav", "no-fav");
            fav.removeAttribute("aria-label");
            fav.setAttribute("aria-label", "marked as no favorite");
        }

    }
    fav.addEventListener("click", toggleFav);

    li.appendChild(fav);

    const neighborhood = document.createElement("p");
    neighborhood.innerHTML = restaurant.neighborhood;
    li.appendChild(neighborhood);

    const address = document.createElement("p");
    address.innerHTML = restaurant.address;
    li.appendChild(address);

    const more = document.createElement("a");
    more.innerHTML = "View Details";
    more.href = DBHelper.urlForRestaurant(restaurant);
    const restName = restaurant.name;
    const cuisine = restaurant.cuisine_type;
    const location = restaurant.neighborhood;
    more.setAttribute("aria-label", ` View ${restName} details. ${cuisine} restaurant located in ${location}`);
    li.appendChild(more);

    return li;

};
const showMap = (locations: any) => {
    map(locations);
};

