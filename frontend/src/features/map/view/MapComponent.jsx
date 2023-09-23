import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";

import MapSearchMarker from "./marker/MapSearchMarker";
import MapFormMarker from "./marker/MapFormMarker";
import MapRecordMarker from "./marker/MapRecordMarker";

import SetRecordsPositionView from "./plugins/SetRecordsPositionView";
import SetSearchPositionView from "./plugins/SetSearchPositionView";
import SetClickPositionView from "./plugins/SetClickPositionView";

import { useSearch } from "src/contexts/SearchContext";
import { useRecords } from "src/contexts/RecordsContext";

function MapComponent() {
  const { isFormOpened, mapPosition, isClicked, records } = useRecords();
  const { isMapSearchMarkerVisible } = useSearch();

  return (
    <MapContainer
      center={mapPosition}
      zoom={6}
      scrollWheelZoom={true}
      style={{ height: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
      />

      {/* For search data */}
      {isMapSearchMarkerVisible && <MapSearchMarker />}

      {/* For create data */}
      {isFormOpened && isClicked && <MapFormMarker />}

      {/* For db data */}
      {records &&
        records.map((record) => (
          <MapRecordMarker record={record} key={record._id} />
        ))}

      <SetRecordsPositionView />
      <SetSearchPositionView />
      {isFormOpened && <SetClickPositionView />}
    </MapContainer>
  );
}

export default React.memo(MapComponent);
