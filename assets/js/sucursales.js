var map = L.map('map').setView([23.2940687,-98.6395392], 6);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// L.mapbox.styleLayer('mapbox://styles/webprointernet/cjwnwwhmf2d8t1cqnyvbgmejy').addTo(map);

// mapboxgl.accessToken = YOUR_KEY;
// var map = new mapboxgl.Map({
//     container: 'map',
//     style: YOUR_STYLE_URL
//     center: [0, 0],
//     zoom: 0
// });

var pin = L.icon({
	iconUrl: '../img/pin.png',
    iconSize:     [42, 55], // size of the icon
    iconAnchor:   [42, 55], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, -50] // point from which the popup should open relative to the iconAnchor
});

L.marker([22.736920, -98.964394], {icon: pin}).addTo(map); 
L.marker([22.7409249, -98.9720636], {icon: pin}).addTo(map); 
L.marker([22.744632, -98.978367], {icon: pin}).addTo(map); 
L.marker([23.7378852, -99.1484132], {icon: pin}).addTo(map); 
L.marker([23.7364437, -99.1371041], {icon: pin}).addTo(map); 
L.marker([22.732132, -98.315041], {icon: pin}).addTo(map); 
L.marker([24.847249, -98.149644], {icon: pin}).addTo(map); 
L.marker([22.269125, -97.873978], {icon: pin}).addTo(map); 
L.marker([21.977580, -99.003872], {icon: pin}).addTo(map); 
L.marker([21.994959, -99.011597], {icon: pin}).addTo(map); 
L.marker([23.638892, -100.637100], {icon: pin}).addTo(map);
L.marker([21.924146, -99.999147], {icon: pin}).addTo(map); 
L.marker([22.000522, -98.782024], {icon: pin}).addTo(map); 
L.marker([22.0452594,-98.1883632], {icon: pin}).addTo(map);
L.marker([21.3427128, -98.2226126], {icon: pin}).addTo(map);
L.marker([21.135843, -98.409398], {icon: pin}).addTo(map);
map.scrollWheelZoom.disable();

// mapbox://styles/webprointernet/cjwnwwhmf2d8t1cqnyvbgmejy