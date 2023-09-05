import { Link } from "react-router-dom";
import { useEffect } from "react";

import styles from "./MapRecordList.module.css";
import MapRecordListItem from "./MapRecordListItem";

import { useRecords } from "../../contexts/RecordsContext";
import { useSearch } from "../../contexts/SearchContext";

// only for test
import records from "../../../testData";

function MapRecordList() {
  const { setIsFormOpened } = useRecords();
  const { setIsMapSearchMarkerVisible } = useSearch();

  // initialize status for first time render
  useEffect(function () {
    setIsMapSearchMarkerVisible(false);
    setIsFormOpened(false);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.topContainer}>
        <h3>Add new record here </h3>
        <Link
          to="/map/form"
          onClick={() => {
            setIsMapSearchMarkerVisible(false);
            setIsFormOpened(true);
          }}
        >
          &#43;
        </Link>
      </div>
      <div className={styles.bottomContainer}>
        <ul>
          {records.map((record) => (
            <MapRecordListItem record={record} key={record.id} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MapRecordList;
