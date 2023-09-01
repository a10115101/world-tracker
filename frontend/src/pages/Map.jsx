import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { Marker } from "react-leaflet/Marker";
import { Popup } from "react-leaflet/Popup";
import { useMap, useMapEvent } from "react-leaflet";

import MapSidebar from "../features/map/MapSidebar";
import MapSearch from "../ui/MapSearch";
import styles from "./Map.module.css";

function Map() {
  const [isOpen, setIsOpen] = useState(true);

  const [selectPosition, setSelectPosition] = useState(null);
  const [mapPosition, setMapPosition] = useState([40, 0]);

  // hook for lat and lng params
  const [searchParams] = useSearchParams();
  const getLat = searchParams.get("lat");
  const getLng = searchParams.get("lng");

  useEffect(
    function () {
      if (getLat && getLng) setMapPosition([getLat, getLng]);
    },
    [getLat, getLng]
  );
  ///////////////////////////////////////////

  const locationSelection = [
    Number(selectPosition?.geometry?.lat),
    Number(selectPosition?.geometry?.lng),
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

            <Marker position={mapPosition}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>

            <ChangeCenter position={mapPosition} />
            {/* <DetectClick /> */}
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

// temp getParams
function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

// function DetectClick() {
//   // const navigate = useNavigate();
//   useMapEvent({
//     click: (e) => console.log(e),
//   });
// }
///////////////////////////////////////////

// temp search
function ResetCenterView({ selectPosition }) {
  const map = useMap();

  useEffect(() => {
    if (selectPosition) {
      map.setView([
        selectPosition?.geometry?.lat,
        selectPosition?.geometry?.lng,
      ]);
    }
  }, [selectPosition]);

  return null;
}

export default Map;
