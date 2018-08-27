
declare var google: any;
export default function initMap(locations: any) {

    const loc = {
        lat: 40.722216,
        lng: -73.987501,
    };

    const map = new google.maps.Map(
        document.getElementById("map"), {
            zoom: 11, center: loc,
            scrollwheel: false,
        });

    locations.map((markerLoc: any) => {
        const marker = new google.maps.Marker({ position: markerLoc, map, animation: google.maps.Animation.DROP });
    });

}
