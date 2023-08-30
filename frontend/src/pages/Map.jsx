import { useEffect, useState } from "react";

import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { Marker } from "react-leaflet/Marker";
import { Popup } from "react-leaflet/Popup";
import { useMap } from "react-leaflet";

import MapSidebar from "../features/map/MapSidebar";
import MapSearch from "../ui/MapSearch";
import styles from "./Map.module.css";

function Map() {
  const [isOpen, setIsOpen] = useState(true);

  const [selectPosition, setSelectPosition] = useState(null);
  const [mapPosition, setMapPosition] = useState([40, 0]);

  const locationSelection = [
    Number(selectPosition?.lat),
    Number(selectPosition?.lon),
  ];

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
              url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
            />

            {selectPosition && (
              <Marker position={locationSelection}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
            )}

            <ResetCenterView selectPosition={selectPosition} />
          </MapContainer>
        </div>

        <div className={styles.mapContainerRight}>
          <MapSearch setSelectPosition={setSelectPosition} />
        </div>
      </div>
    </div>
  );
}

// temp
function ResetCenterView({ selectPosition }) {
  const map = useMap();

  useEffect(() => {
    if (selectPosition) {
      map.setView([selectPosition?.lat, selectPosition?.lon]);
    }
  }, [selectPosition]);

  return null;
}

export default Map;
