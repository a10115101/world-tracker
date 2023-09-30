import { useState } from "react";

import { useRecordsFilter } from "src/contexts/RecordsFilterContext";
import styles from "./MapRecordFilter.module.css";

function MapRecordFilter({ name }) {
  const { statusFilter, setStatusFilter, dateFilter, setDateFilter } =
    useRecordsFilter();

  const [isFilterOpened, setIsFilterOpened] = useState(false);

  return (
    <>
      <div className={styles.topContainer}>
        <h3>{name}</h3>
        <button onClick={() => setIsFilterOpened(!isFilterOpened)}>
          <i className="fa-solid fa-filter" />
        </button>
      </div>

      {isFilterOpened && (
        <div className={styles.bottomContainer}>
          <div>
            <p>Status</p>
            <button
              className={statusFilter === "all" ? `${styles.btnFocus}` : ""}
              onClick={() => setStatusFilter("all")}
            >
              All
            </button>
            <button
              className={statusFilter === "visited" ? `${styles.btnFocus}` : ""}
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
    </>
  );
}

export default MapRecordFilter;
