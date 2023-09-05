import { useState } from "react";

import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { Marker } from "react-leaflet/Marker";
import { Popup } from "react-leaflet/Popup";

import MapSearchMarker from "../features/map/MapSearchMarker";
import MapFormMarker from "../features/map/MapFormMarker";
import MapSidebar from "../features/map/MapSidebar";
import MapSearch from "../features/map/MapSearch";
import styles from "./Map.module.css";

import { useRecords } from "../contexts/RecordsContext";
import { useSearch } from "../contexts/SearchContext";

import SetSearchPositionView from "../features/map/plugins/SetSearchPositionView";
import SetRecordsPositionView from "../features/map/plugins/SetRecordsPositionView";
import SetClickPositionView from "../features/map/plugins/SetClickPositionView";

// only for test
import records from "../../testData";

function Map() {
  const { isFormOpened, mapPosition, isClicked } = useRecords();
  const { isMapSearchMarkerVisible } = useSearch();

  const [isSidebarOpened, setIsSidebarOpened] = useState(true);

  return (
    <div className={styles.container}>
      {isSidebarOpened ? <MapSidebar /> : null}

      <div className={styles.mapContainer}>
        <div className={styles.mapContainerLeft}>
          <button onClick={() => setIsSidebarOpened(!isSidebarOpened)}>
            {!isSidebarOpened ? "Open" : "Close"}
          </button>
        </div>

        <div className={styles.mapContainerCenter}>
          <MapContainer
            center={mapPosition}
            zoom={6}
            scrollWheelZoom={true}
            className={styles.map}
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
              <Marker
                position={[record.position.lat, record.position.lng]}
                key={record.id}
              >
                <Popup>
                  <span>{record.countryCode}</span>
                  <span>{record.cityName}</span>
                </Popup>
              </Marker>
            ))}

            <SetRecordsPositionView />
            <SetSearchPositionView />
            {isFormOpened && <SetClickPositionView />}
          </MapContainer>
        </div>

        <div className={styles.mapContainerRight}>
          <MapSearch />
        </div>
      </div>
    </div>
  );
}

export default Map;
