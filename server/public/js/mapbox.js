const locations = JSON.parse(document.getElementById('map').dataset.locations);

export const displayMap = (locations) => {
  var map = L.map('map', { zoomControl: false });

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

var greenIcon = L.icon({
  iconUrl: '/img/pin.png',
  iconSize: [32, 40], // size of the icon
  iconAnchor: [16, 45], // point of the icon which will correspond to marker's location
  popupAnchor: [0, -50], // point from which the popup should open relative to the iconAnchor
});

const points = [];
locations.forEach(loc => {
    points.push([loc.coordinates[1],loc.coordinates[0]]);
    L.marker([loc.coordinates[1], loc.coordinates[0]], { icon: greenIcon })
        .addTo(map)
        .bindPopup(`<p>Day ${loc.day}: ${loc.description}</p>`, {
            autoClose: false,
            className: 'mapPopup'
        })
        .openPopup();
})

const bounds = L.latLngBounds(points).pad(0.5);
map.fitBounds(bounds);
 
// Disable scroll on map
map.scrollWheelZoom.disable();
}

