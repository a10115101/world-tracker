import { MapContainer, TileLayer } from "react-leaflet";

import MapSearchMarker from "./marker/MapSearchMarker";
import MapFormMarker from "./marker/MapFormMarker";
import MapRecordMarker from "./marker/MapRecordMarker";
import SetRecordsPositionView from "./plugins/SetRecordsPositionView";
import SetSearchPositionView from "./plugins/SetSearchPositionView";
import SetClickPositionView from "./plugins/SetClickPositionView";
import { useMapPosition } from "src/contexts/MapPositionContext";

function MapComponent() {
  const { mapPosition } = useMapPosition();

  return (
    <MapContainer
      center={mapPosition}
      zoom={2}
      scrollWheelZoom={true}
      style={{ height: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
      />

      <MapSearchMarker />
      <MapFormMarker />
      <MapRecordMarker />

      <SetRecordsPositionView />
      <SetSearchPositionView />
      <SetClickPositionView />
    </MapContainer>
  );
}

export default MapComponent;
