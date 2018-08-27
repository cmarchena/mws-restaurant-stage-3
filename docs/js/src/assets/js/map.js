export default function initMap(locations) {
    const loc = {
        lat: 40.712216,
        lng: -73.987501,
    };
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 12, center: loc,
        scrollwheel: false,
    });
    locations.map((markerLoc) => {
        const marker = new google.maps.Marker({ position: markerLoc, map, animation: google.maps.Animation.DROP });
    });
}
