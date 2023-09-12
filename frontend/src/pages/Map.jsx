import { useState } from "react";

import MapComponent from "../features/map/MapComponent";
import MapSidebar from "../features/map/MapSidebar";
import MapSearch from "../features/map/MapSearch";
import styles from "./Map.module.css";

function Map() {
  const [isSidebarOpened, setIsSidebarOpened] = useState(true);

  return (
    <div className={styles.container}>
      {isSidebarOpened ? <MapSidebar /> : null}

      <div className={styles.mapContainer}>
        <div className={styles.mapContainerLeft}>
          <button
            onClick={() => {
              setIsSidebarOpened(!isSidebarOpened);
            }}
          >
            {!isSidebarOpened ? "Open" : "Close"}
          </button>
        </div>

        <div className={styles.mapContainerCenter}>
          <MapComponent />
        </div>

        <div className={styles.mapContainerRight}>
          <MapSearch />
        </div>
      </div>
    </div>
  );
}

export default Map;
