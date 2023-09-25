import { useState } from "react";
import { Outlet } from "react-router-dom";

import styles from "./MapSidebar.module.css";
import { useRecords } from "../../contexts/RecordsContext";

function MapSidebar() {
  const { statusMode, setStatusMode, dateMode, setDateMode } = useRecords();

  const [isOpenFilter, setIsOpenFilter] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.topContainer}>
        <div className={styles.topLeftContainer}>
          <h3>Record List</h3>
          <button onClick={() => setIsOpenFilter(!isOpenFilter)}>
            <i className="fa-solid fa-filter" />
          </button>
        </div>

        {isOpenFilter && (
          <div className={styles.topRightContainer}>
            <div>
              <p>Status</p>
              <button
                className={statusMode === "all" ? `${styles.btnFocus}` : ""}
                onClick={() => setStatusMode("all")}
              >
                All
              </button>
              <button
                className={statusMode === "visited" ? `${styles.btnFocus}` : ""}
                onClick={() => setStatusMode("visited")}
              >
                Vistited
              </button>
              <button
                className={
                  statusMode === "planning" ? `${styles.btnFocus}` : ""
                }
                onClick={() => setStatusMode("planning")}
              >
                Planning
              </button>
            </div>
            <div>
              <p>Date</p>
              <button
                className={dateMode === "asc" ? `${styles.btnFocus}` : ""}
                onClick={() => setDateMode("asc")}
              >
                Ascending
              </button>
              <button
                className={dateMode === "des" ? `${styles.btnFocus}` : ""}
                onClick={() => setDateMode("des")}
              >
                Descending
              </button>
            </div>
          </div>
        )}
      </div>
      <div className={styles.bottomContainer}>
        <Outlet />
      </div>
    </div>
  );
}

export default MapSidebar;
