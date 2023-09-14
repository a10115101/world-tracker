import { Marker, Popup } from "react-leaflet";

import { LeafIcon } from "../../utilities/icon";

function MapRecordMarker({ record }) {
  const greenIcon = new LeafIcon({ iconUrl: "/green-pin.png" });
  const yellowIcon = new LeafIcon({ iconUrl: "/yellow-pin.png" });

  const lng = record.position.coordinates[0];
  const lat = record.position.coordinates[1];

  return (
    <Marker
      position={[lat, lng]}
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
