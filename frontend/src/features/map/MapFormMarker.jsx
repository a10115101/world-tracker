import { Marker, Popup } from "react-leaflet";

import { useRecords } from "../../contexts/RecordsContext";
import { LeafIcon } from "../../utilities/icon";

function MapFormMarker() {
  const { mapPosition } = useRecords();

  const redIcon = new LeafIcon({ iconUrl: "/red-pin.png" });

  return (
    <Marker position={mapPosition} icon={redIcon}>
      <Popup>
        <h3>Current position</h3>
      </Popup>
    </Marker>
  );
}

export default MapFormMarker;
