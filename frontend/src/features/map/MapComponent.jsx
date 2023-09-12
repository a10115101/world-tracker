import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";

import MapSearchMarker from "./MapSearchMarker";
import MapFormMarker from "./MapFormMarker";
import MapRecordMarker from "./MapRecordMarker";
import SetRecordsPositionView from "./plugins/SetRecordsPositionView";
import SetSearchPositionView from "./plugins/SetSearchPositionView";
import SetClickPositionView from "./plugins/SetClickPositionView";

import { useSearch } from "../../contexts/SearchContext";
import { useRecords } from "../../contexts/RecordsContext";

import records from "../../../testData";

function MapComponent() {
  const { isFormOpened, mapPosition, isClicked } = useRecords();
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
      {records.map((record) => (
        <MapRecordMarker record={record} key={record.id} />
      ))}

      <SetRecordsPositionView />
      <SetSearchPositionView />
      {isFormOpened && <SetClickPositionView />}
    </MapContainer>
  );
}

export default React.memo(MapComponent);
