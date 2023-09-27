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
        attribution={import.meta.env.VITE_LEAFLET_MAP_CONFIG}
        url={import.meta.env.VITE_LEAFLET_MAP_STYLE}
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
