import { Marker, Popup } from "react-leaflet";

import { useMapSearch } from "src/contexts/MapSearchContext";
import { LeafIcon } from "src/utilities/icon";

function MapSearchMarker() {
  const { selectedPosition } = useMapSearch();

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
