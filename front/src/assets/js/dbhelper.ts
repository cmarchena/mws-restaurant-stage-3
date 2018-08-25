import idb from 'idb';
import { Restaurant, Review } from "./interfaces";
declare var google: any;
export default class DBHelper {

    public static DATABASE_URL = () => {
        // Changed to Heroku
        // return 'http://localhost:1337'
        return `https://mws-project-3.herokuapp.com`;
    }
    public static dbPromise = () => {
        return idb.open("test", 3, (upgradeDb) => {
            switch (upgradeDb.oldVersion) {
                case 0:
                    upgradeDb.createObjectStore("restaurants", { keyPath: "id" });
                case 1:
                    const restStore = upgradeDb.transaction.objectStore("restaurants");
                    restStore.createIndex("cuisine", "cuisine_type");
                    restStore.createIndex("neighborhoods", "neighborhood");
                    restStore.createIndex("id", "id");
                case 2:
                    upgradeDb.createObjectStore("reviews", { keyPath: "id" });
                    const reviewsStore = upgradeDb.transaction.objectStore("reviews");
                    reviewsStore.createIndex("id", "restaurant_id");

            }
        });
    }

    public static storedRestaurants = () => {
        return fetch(`${DBHelper.DATABASE_URL()}/restaurants`, {
            mode: "cors",
        })
            .then((res: Response) => res.json())
            .then((restaurants: Restaurant[]) => {
                return DBHelper.dbPromise().then((db) => {
                    const tx = db.transaction("restaurants", "readwrite");
                    const restStore = tx.objectStore("restaurants");
                    restaurants.map((restaurant: Restaurant) => {
                        restStore.put(restaurant);
                    });
                    return tx.complete.then(() => Promise.resolve(restaurants));

                });
            });
    }

    public static storedReviews = () => {
        return fetch(`${DBHelper.DATABASE_URL()}/reviews`, {
            mode: "cors",
        })
            .then((res: Response) => res.json())
            .then((reviews: Review[]) => {
                return DBHelper.dbPromise().then((db) => {
                    const tx = db.transaction("reviews", "readwrite");
                    const reviewsStore = tx.objectStore("reviews");
                    reviews.map((review: Review) => {
                        reviewsStore.put(review);
                    });
                    return tx.complete.then(() => Promise.resolve(reviews));

                });
            });
    }

    public static readAllRestaurants = () => {
        return DBHelper.storedRestaurants().then(() => {
            return DBHelper.dbPromise().then((db) => {
                return db.transaction("restaurants").objectStore("restaurants").getAll();
            });
        });
    }

    public static readRestaurantById = (id: number) => {
        return DBHelper.storedRestaurants().then(() => {
            return DBHelper.dbPromise().then((db) => {
                return db.transaction("restaurants").objectStore("restaurants").get(id);
            });
        });
    }
    public static getReviewById = (id: number) => {
        return fetch(`${DBHelper.DATABASE_URL()}/reviews/?restaurant_id=${id}`, {
            mode: "cors",
        })
            .then((res) => res.json())
            .then((reviews) => reviews);
    }
    public static readReviewById = (id: number) => {
        return DBHelper.storedReviews().then(() => {
            return DBHelper.dbPromise().then((db) => {
                return db.transaction("reviews").objectStore("reviews").index("id").get(id);
            });
        });
    }

    public static readAllReviews = () => {
        return DBHelper.storedReviews().then(() => {
            return DBHelper.dbPromise().then((db) => {
                return db.transaction("reviews").objectStore("reviews").getAll();
            });
        });
    }

    public static urlForRestaurant = (restaurant: Restaurant) => {
        return (`./restaurant.html?id=${restaurant.id}`);
    }
    public static mapMarkerForRestaurant(restaurant: Restaurant, map: any) {
        const marker = new google.maps.Marker({
            position: restaurant.latlng,
            title: restaurant.name,
            url: DBHelper.urlForRestaurant(restaurant),
            map,
            animation: google.maps.Animation.DROP,
        });
        return marker;
    }
    public static NEW_REVIEW = (data: object) => {

        if (navigator.onLine) {
            return fetch(`${DBHelper.DATABASE_URL()}/reviews`, {
                method: "POST",
                mode: "cors",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((res) => res.json())
                .then((success) => console.log("Success", success))
                .then(() => {
                    alert("Review created successfully!");
                    window.location.reload();
                });

        } else {
            return alert("You're offline!");
        }
    }
}
