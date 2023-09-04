import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { Marker } from "react-leaflet/Marker";
import { Popup } from "react-leaflet/Popup";
import { useMap } from "react-leaflet";

import MapSidebar from "../features/map/MapSidebar";
import MapSearch from "../features/map/MapSearch";
import styles from "./Map.module.css";

import { useRecords } from "../contexts/RecordsContext";
import { useSearch } from "../contexts/SearchContext";

import MapSearchMarker from "../features/map/MapSearchMarker";
import SetSearchCenterView from "../features/map/plugins/SetSearchCenterView";
import DetectClick from "../features/map/plugins/DetectClick";

// only for test
import records from "../../testData";
import SetRecordsCenterView from "../features/map/plugins/SetRecordsCenterView";

function Map() {
  const { isOpenForm, mapPosition } = useRecords();
  const { isVisibleMarker } = useSearch();

  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={styles.container}>
      {isOpen ? <MapSidebar /> : null}

      <div className={styles.mapContainer}>
        <div className={styles.mapContainerLeft}>
          <button onClick={() => setIsOpen(!isOpen)}>
            {!isOpen ? "Open" : "Close"}
          </button>
        </div>

        <div className={styles.mapContainerCenter}>
          <MapContainer
            center={mapPosition}
            zoom={5}
            scrollWheelZoom={true}
            className={styles.map}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
            />

            {/* For search data */}
            {isVisibleMarker && <MapSearchMarker />}

            {/* For create data */}
            <Marker position={mapPosition}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>

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

            <SetRecordsCenterView />
            <SetSearchCenterView />
            {isOpenForm && <DetectClick />}
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
