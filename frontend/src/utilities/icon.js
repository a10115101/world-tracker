import L from "leaflet";

export const LeafIcon = L.Icon.extend({
  options: {
    iconSize: [32, 32],
    iconAnchor: [15, 32.5],
    popupAnchor: [0, -32.5],
  },
});
