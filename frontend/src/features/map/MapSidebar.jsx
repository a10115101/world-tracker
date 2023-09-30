import { Outlet } from "react-router-dom";

import MapRecordFilter from "./filter/MapRecordFilter";
import styles from "./MapSidebar.module.css";

function MapSidebar() {
  return (
    <div className={styles.container}>
      <div className={styles.topContainer}>
        <MapRecordFilter name={"Record List"} />
      </div>
      <div className={styles.bottomContainer}>
        <Outlet />
      </div>
    </div>
  );
}

export default MapSidebar;
