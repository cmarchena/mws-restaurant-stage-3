import idb from 'idb';
export default class DBHelper {
    static mapMarkerForRestaurant(restaurant, map) {
        const marker = new google.maps.Marker({
            position: restaurant.latlng,
            title: restaurant.name,
            url: DBHelper.urlForRestaurant(restaurant),
            map,
            animation: google.maps.Animation.DROP,
        });
        return marker;
    }
}
DBHelper.DATABASE_URL = () => {
    // Changed to Heroku
    // return 'http://localhost:1337'
    return `https://mws-project-3.herokuapp.com`;
};
DBHelper.dbPromise = () => {
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
};
DBHelper.storedRestaurants = () => {
    return fetch(`${DBHelper.DATABASE_URL()}/restaurants`, {
        mode: "cors",
    })
        .then((res) => res.json())
        .then((restaurants) => {
        return DBHelper.dbPromise().then((db) => {
            const tx = db.transaction("restaurants", "readwrite");
            const restStore = tx.objectStore("restaurants");
            restaurants.map((restaurant) => {
                restStore.put(restaurant);
            });
            return tx.complete.then(() => Promise.resolve(restaurants));
        });
    });
};
DBHelper.storedReviews = () => {
    return fetch(`${DBHelper.DATABASE_URL()}/reviews`, {
        mode: "cors",
    })
        .then((res) => res.json())
        .then((reviews) => {
        return DBHelper.dbPromise().then((db) => {
            const tx = db.transaction("reviews", "readwrite");
            const reviewsStore = tx.objectStore("reviews");
            reviews.map((review) => {
                reviewsStore.put(review);
            });
            return tx.complete.then(() => Promise.resolve(reviews));
        });
    });
};
DBHelper.readAllRestaurants = () => {
    return DBHelper.storedRestaurants().then(() => {
        return DBHelper.dbPromise().then((db) => {
            return db.transaction("restaurants").objectStore("restaurants").getAll();
        });
    });
};
DBHelper.readRestaurantById = (id) => {
    return DBHelper.storedRestaurants().then(() => {
        return DBHelper.dbPromise().then((db) => {
            return db.transaction("restaurants").objectStore("restaurants").get(id);
        });
    });
};
DBHelper.getReviewById = (id) => {
    return fetch(`${DBHelper.DATABASE_URL()}/reviews/?restaurant_id=${id}`, {
        mode: "cors",
    })
        .then((res) => res.json())
        .then((reviews) => reviews);
};
DBHelper.readReviewById = (id) => {
    return DBHelper.storedReviews().then(() => {
        return DBHelper.dbPromise().then((db) => {
            return db.transaction("reviews").objectStore("reviews").index("id").get(id);
        });
    });
};
DBHelper.readAllReviews = () => {
    return DBHelper.storedReviews().then(() => {
        return DBHelper.dbPromise().then((db) => {
            return db.transaction("reviews").objectStore("reviews").getAll();
        });
    });
};
DBHelper.urlForRestaurant = (restaurant) => {
    return (`./restaurant.html?id=${restaurant.id}`);
};
DBHelper.NEW_REVIEW = (data) => {
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
    }
    else {
        return alert("You're offline!");
    }
};
