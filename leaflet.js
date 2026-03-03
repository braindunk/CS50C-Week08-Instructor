// the leaflet library is accessible via the defined object L

// Step 1: define an array of geocoord points: latitude, longitude
let mycoord = [ 38.440968, -122.713466 ];

// Step 2: define a zoom level
let myzoom = 16;

// Step 3: create a leaflet map using html element with id = "map1"
let mymap = L.map('map1');

// Step 4: provide the map object a center geocoord and zoom level
// setView() takes 2 args: center geocoord array, zoom level integer
mymap.setView( mycoord, myzoom );

// Step 5: set map tile provider 
// (OpenSteetMap provides map tile image service just like Google Maps does)
// tileLayer() takes 2 args: URL for tiles, obj value for options for map (maxzoom, attribution)
let mytiles = L.tileLayer(
  'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    maxZoom: 19,
    attribution: 'Wow! &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }
);

// Step 6: connect the tile layer to our leaflet map object
mytiles.addTo(mymap);

// At this point we have an interactive map in our html page! YAY

// Step 7: create a leaflet marker object (part 1 of 4)
let mymarker = L.marker( mycoord );

// Step 8: place marker on the map (part 2 of 4) [at this point marker is shown]
mymarker.addTo(mymap);

// Step 9: make marker clickable and have marker open a popup when clicked (part 3 of 4)
let mypopup = mymarker.bindPopup('<strong>Hello!</strong><br>I am a popup!');

// Step 10: (optional if you want popup open before clicking it)
mypopup.openPopup();

// Extra credit zone: adding shapes to the map visualization

// Step 11: Create a vector circle shape
// circle() takes 2 args: array [lat,long] geocoord for its center, obj value for options
let mycircle = L.circle(
  [ 38.4405695,-122.7148936 ],
  {
    color: 'red',
    fillColor: '#ff0033',
    fillOpacity: 0.5,
    radius: 100
  }
);

// Step 12: add circle object to map
mycircle.addTo(mymap);

// Step 13: add popup to circle that opens when circle is clicked
mycircle.bindPopup('I am circle!');

// Now let's make a polygon!

// Step 14: define a polygon shape using array of geocoords
let myshape = L.polygon(
  [
    [ 38.4409508, -122.7133687 ],
    [ 38.4339508, -122.6933687 ],
    [ 38.4419508, -122.6803687 ]
  ]
);

// Step 15: add polygon to map
myshape.addTo(mymap);

// Step 16: add popup to polygon
myshape.bindPopup('I am polygon!');

// Bonus: make a freestanding popup that appears wherever user clicks anywhere on map

// Step 17: create popup object (not visible on map yet)
let mypopup2 = L.popup();

// Step 18: make a function that runs when user clicks ANYWHERE on the map
// when a click happens, leaflet will call my function and give it details about click
function onMapClick( myevent ) {
  console.log( myevent );
  mypopup2.setLatLng(myevent.latlng);
  mypopup2.setContent('You clicked here: ' + myevent.latlng.toString() );
  mypopup2.openOn(mymap);
}

// Step 19: associate the user click anywhere on map to call function
mymap.on('click', onMapClick);

// adding another marker
let mymarker2 = L.marker( [38.444665, -122.708766] );
mymarker2.addTo(mymap);
let mypopup3 = mymarker2.bindPopup('Marker 2 is here');

// javascript library used in this project:
// leaflet.js, © 2010–2025 Volodymyr Agafonkin,  https://leafletjs.com/