import { Marker, Popup } from "react-leaflet";

import { useSearch } from "../../contexts/SearchContext";

function MapSearchMarker() {
  const { selectedPosition } = useSearch();

  const locationSelection = [
    Number(selectedPosition?.geometry?.lat),
    Number(selectedPosition?.geometry?.lng),
  ];

  return (
    <Marker position={locationSelection}>
      <Popup>
        <span>
          Lat: {locationSelection[0]}, Lng: {locationSelection[1]}
        </span>
      </Popup>
    </Marker>
  );
}

export default MapSearchMarker;
