// Creates a map at a set longitude and latitude
const map = L.map('map').setView([40.6795092, -73.9972808], 18);

// Creates a OpenStreetMap tile layer
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

// Creates a pin at a set longitude and latitude
const marker = L.marker([40.6794082, -73.9972808]).addTo(map);
document.querySelector('.leaflet-marker-icon').src =
  '../assets/marker-icon.png';

// Creates a text bubble at a set longitude and
const popup = L.popup()
  .setLatLng([40.6795092, -73.9972808])
  .setContent(
    'Come to our Stoop Sale for amazing vibes and great deals.<br> 2nd Pl & Court St · Brooklyn, NY 11231'
  )
  .openOn(map);
