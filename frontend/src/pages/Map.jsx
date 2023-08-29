import { useState } from "react";

import MapSidebar from "../features/map/MapSidebar";
import styles from "./Map.module.css";

function Map() {
  const [isOpen, setIsOpen] = useState(true);

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
        <div className={styles.mapContainerCenter}>Map</div>
        <div className={styles.mapContainerRight}>
          <i className="fa-solid fa-magnifying-glass" />
          <input type="text" placeholder="Search for country or city" />
        </div>
      </div>
    </div>
  );
}

export default Map;
