import { Outlet } from "react-router-dom";

import styles from "./MapSidebar.module.css";

function MapSidebar() {
  return (
    <div className={styles.container}>
      <div className={styles.topContainer}>
        <h3>Total 100 Records</h3>
      </div>
      <div className={styles.bottomContainer}>
        <Outlet />
      </div>
    </div>
  );
}

export default MapSidebar;
