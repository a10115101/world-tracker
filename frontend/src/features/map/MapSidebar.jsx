import { useState } from "react";
import { Outlet } from "react-router-dom";

import { useRecords } from "src/contexts/RecordsContext";
import styles from "./MapSidebar.module.css";

function MapSidebar() {
  const { statusFilter, setStatusFilter, dateFilter, setDateFilter } =
    useRecords();

  const [isFilterOpened, setIsFilterOpened] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.topContainer}>
        <div className={styles.topLeftContainer}>
          <h3>Record List</h3>
          <button onClick={() => setIsFilterOpened(!isFilterOpened)}>
            <i className="fa-solid fa-filter" />
          </button>
        </div>

        {isFilterOpened && (
          <div className={styles.topRightContainer}>
            <div>
              <p>Status</p>
              <button
                className={statusFilter === "all" ? `${styles.btnFocus}` : ""}
                onClick={() => setStatusFilter("all")}
              >
                All
              </button>
              <button
                className={
                  statusFilter === "visited" ? `${styles.btnFocus}` : ""
                }
                onClick={() => setStatusFilter("visited")}
              >
                Vistited
              </button>
              <button
                className={
                  statusFilter === "planning" ? `${styles.btnFocus}` : ""
                }
                onClick={() => setStatusFilter("planning")}
              >
                Planning
              </button>
            </div>
            <div>
              <p>Date</p>
              <button
                className={dateFilter === "asc" ? `${styles.btnFocus}` : ""}
                onClick={() => setDateFilter("asc")}
              >
                Asc
              </button>
              <button
                className={dateFilter === "des" ? `${styles.btnFocus}` : ""}
                onClick={() => setDateFilter("des")}
              >
                Desc
              </button>
            </div>
            <div>
              <button
                className={styles.btnClose}
                onClick={() => setIsFilterOpened(!isFilterOpened)}
              >
                Close <i className="fa-solid fa-xmark" />
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
