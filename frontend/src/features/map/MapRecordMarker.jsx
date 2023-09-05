import { Marker, Popup } from "react-leaflet";

import { LeafIcon } from "../../utilities/icon";

function MapRecordMarker({ record }) {
  const greenIcon = new LeafIcon({ iconUrl: "/green-pin.png" });
  const yellowIcon = new LeafIcon({ iconUrl: "/yellow-pin.png" });

  return (
    <Marker
      position={[record.position.lat, record.position.lng]}
      icon={record.status === "visited" ? greenIcon : yellowIcon}
    >
      <Popup>
        <h3>Status: {record.status.toUpperCase()}</h3>
        <h4>
          Place: {record.country} {record.cityName}
        </h4>
      </Popup>
    </Marker>
  );
}

export default MapRecordMarker;
