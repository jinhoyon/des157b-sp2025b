(function () {
  "use strict";

  // add your script here
  var map = L.map("map").setView([37.532863,126.975251], 14);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  // Interactive element 1: Marker
  var marker = L.marker([37.529488, 126.964645]).addTo(map);
  marker.bindPopup("Yongsan Station");

  // Interactive element 2: Circle
  var circle = L.circle([37.525475,126.982570], {
    fillOpacity: 0.5,
    radius: 300,
  }).addTo(map);
  circle.bindPopup("Golf");

  // Interactive element 3: Polygon
  var Polygon = L.polygon([
    [37.523361, 126.973433],
    [37.521983, 126.971973],
    [37.52143, 126.974892],
  ], {
    fillOpacity: 0.5
  }).addTo(map);
  Polygon.bindPopup("Ichon Station");

})();
