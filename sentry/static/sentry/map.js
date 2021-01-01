// Import formatDate
import {formatDate} from './sentry.js';

// Check if geolocation is enabled. If so, get user current position, else, use default 'setView'
let getPosition = new Promise((resolve, reject) => {
  navigator.permissions.query({name: 'geolocation'}).then(perm => {
    if (perm.state === 'denied')
      reject({lat: 20, lng: 0, zoom: 2});
    else {
      navigator.geolocation.getCurrentPosition(pos => {
        resolve({lat: pos.coords.latitude, lng: pos.coords.longitude, zoom: 12});
      })
    }
  })
})

// Map
var sentry_map = L.map('map')
getPosition.then(result => {
  sentry_map.setView([result.lat, result.lng], result.zoom);
})
.catch(result => {
  sentry_map.setView([result.lat, result.lng], result.zoom);
})

// Fetch OpenStreetMap data
L.tileLayer('http://a.tile.osm.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
}).addTo(sentry_map);

// Alert icon settings
var alert_icon = L.icon({
  iconUrl: '/static/sentry/resources/alert-pin.png',
  iconSize: [34, 35],
  iconAnchor: [17, 35],
  popupAnchor: [0, -36],
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null
});

// Sighting icon settings
var sight_icon = L.icon({
  iconUrl: 'static/sentry/resources/sight-pin.png',
  iconSize: [34, 35],
  iconAnchor: [17, 35],
  popupAnchor: [0, -36],
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null
});

// Add missing alerts markers with popups
missings.forEach(el => {
  var date = formatDate(el.time);
  var new_marker = L.marker([el.lat,el.lng], {icon:alert_icon}).addTo(sentry_map);
  var popup = L.popup({maxWidth: 140, maxHeight: 400}).setContent(`<img width='140px' height='140px' src=${el.image} >
  <p><b>Name: ${el.name}</b><p><b>Last Seen: </b>${date}<p><b>Description:</b> ${el.desc}</p><p><b>Contact:</b> ${el.contact}</p>`);
  new_marker.bindPopup(popup);
})

// Add sightings markers with popups
sightings.forEach(el => {
  var date = formatDate(el.time);
  var new_marker = L.marker([el.lat, el.lng], {icon:sight_icon}).addTo(sentry_map);
  var popup = L.popup({maxWidth: 140, maxHeight: 400}).setContent(`<img width='140px' height='140px'src=${el.image} >
  <p><b>Seen: </b>${date}<p><b>Description:</b> ${el.desc}</p><p><b>Contact:</b> ${el.contact}</p>`);
  new_marker.bindPopup(popup);
})

// Export map and popup icons settings
export {sentry_map, alert_icon, sight_icon};