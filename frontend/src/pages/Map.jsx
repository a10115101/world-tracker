import { useState } from "react";

import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { Marker } from "react-leaflet/Marker";
import { Popup } from "react-leaflet/Popup";

import MapSidebar from "../features/map/MapSidebar";
import MapSearch from "../ui/MapSearch";
import styles from "./Map.module.css";

function Map() {
  const [isOpen, setIsOpen] = useState(true);

  const [mapPosition, setMapPosition] = useState([40, 0]);

  return (
    <div className={styles.container}>
      {isOpen ? <MapSidebar /> : null}

      <div className={styles.mapContainer}>
        <button
          className={styles.mapContainerLeft}
          onClick={() => setIsOpen(!isOpen)}
        >
          {!isOpen ? "Open" : "Close"}
        </button>

        <div className={styles.mapContainerCenter}>
          <MapContainer
            center={mapPosition}
            zoom={5}
            scrollWheelZoom={true}
            className={styles.map}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
            />
            <Marker position={mapPosition}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
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
