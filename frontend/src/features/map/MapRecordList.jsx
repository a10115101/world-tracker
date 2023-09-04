import { Link } from "react-router-dom";

import styles from "./MapRecordList.module.css";
import MapRecordListItem from "./MapRecordListItem";
import { useRecords } from "../../contexts/RecordsContext";

// only for test
import records from "../../../testData";

function MapRecordList() {
  const { setIsOpenForm } = useRecords();

  return (
    <div className={styles.container}>
      <div className={styles.topContainer}>
        <h3>Add new record here </h3>
        <Link to="/map/form" onClick={() => setIsOpenForm(true)}>
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
