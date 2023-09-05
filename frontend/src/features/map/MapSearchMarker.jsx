import { Marker, Popup } from "react-leaflet";

import { useSearch } from "../../contexts/SearchContext";
import { LeafIcon } from "../../utilities/icon";

function MapSearchMarker() {
  const { selectedPosition } = useSearch();

  const locationSelection = [
    Number(selectedPosition?.geometry?.lat),
    Number(selectedPosition?.geometry?.lng),
  ];

  const redIcon = new LeafIcon({ iconUrl: "/red-pin.png" });

  return (
    <Marker position={locationSelection} icon={redIcon}>
      <Popup>
        <h3>
          Lat: {locationSelection[0]}, Lng: {locationSelection[1]}
        </h3>
      </Popup>
    </Marker>
  );
}

export default MapSearchMarker;
