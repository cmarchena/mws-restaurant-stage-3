var dbPromise = idb.open('restaurants-json', 1, function (upgradeDb) {
  var store = upgradeDb.createObjectStore('json', {
    keyPath: 'id'
  });
  store.createIndex('by-name', 'name');
  store.createIndex('by-location', 'neighborhood');
});

fetch("http://localhost:1337/restaurants")
  .then(res => res.json())
  .then(json => storeItems(json))

function storeItems(data) {

  dbPromise.then(function (db) {
    if (!db) return;
    var tx = db.transaction('json', 'readwrite');
    var store = tx.objectStore('json');
    data.forEach(function (message) {
      console.log(message);
      store.put(message)

      return tx.complete;
    })
  })
}