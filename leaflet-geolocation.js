// this example uses leaflet's built-in locate() method to automatically center the map at user's geolocation, if available
// the leaflet library is accessible via the defined object L

// Step 1: use this location if geolocation is not found
//         define an array of geocoord points: latitude, longitude
let mycoord = [ 38.440968, -122.713466 ];

// Step 2: define a zoom level
let myzoom = 16;

// Step 3: create a leaflet map using html element with id = "map1"
let mymap = L.map('map1');

// Step 4: define a function to run after leaflet successfully 
//         finds user's geolocation so we can add a marker there
function onLocationFound(e) {
  let radius = e.accuracy;

  // create a leaflet marker object (part 1 of 4)
  let mymarker = L.marker( e.latlng );

  // place marker on the map (part 2 of 4) [at this point marker is shown]
  mymarker.addTo(mymap);

  // make marker clickable and have marker open a popup when clicked (part 3 of 4)
  let mypopup = mymarker.bindPopup("You are within " + radius + " meters from this point");

  // (optional if you want popup open before clicking it)
  mypopup.openPopup();

  // draw circle showing radius of geolocation accuracy
  L.circle(e.latlng, radius).addTo(mymap);

}

// Step 5: attach our new function to the 'locationfound' event that leaflet generates when it finds user geoloc
mymap.on('locationfound', onLocationFound);

// Step 6: define a function to run if leaflet cannot find user geoloc
function onLocationError(e) {

  // zoom + pan map to our geoloc that we defined in step 1 as fallback loc for map center
  mymap.setZoom(myzoom);
  mymap.panTo(mycoord);

  // show error in popup
  L.popup()
  .setLatLng(mycoord)
  .setContent('<p>' + e.message + '</p>')
  .openOn(mymap);

  // show geoloc error in browser console
  console.log(e.message);
}

// Step 7: attach our new function to the 'locationfound' event that leaflet generates when it finds user geoloc
mymap.on('locationerror', onLocationError);

// Step 8: provide the map object a center geocoord and zoom level
// locate() takes an object value as its argument, with at least two properties defined: setView (to true) and maxZoom
mymap.locate( {setView: true, maxZoom: myzoom} );

// Step 9: set map tile provider 
// (OpenSteetMap provides map tile image service just like Google Maps does)
// tileLayer() takes 2 args: URL for tiles, obj value for options for map (maxzoom, attribution)
let mytiles = L.tileLayer(
  'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    maxZoom: 19,
    attribution: 'Wow! &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }
);

// Step 10: connect the tile layer to our leaflet map object
mytiles.addTo(mymap);

// At this point we have an interactive map and geolocated in our html page!

// javascript library used in this project:
// leaflet.js, © 2010–2025 Volodymyr Agafonkin,  https://leafletjs.com/