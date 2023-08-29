import styles from "./MapRecordList.module.css";
import MapRecordListItem from "./MapRecordListItem";

// only for test
import records from "../../../testData";

function MapRecordList() {
  return (
    <ul className={styles.container}>
      {records.map((record) => (
        <MapRecordListItem record={record} key={record.id} />
      ))}
    </ul>
  );
}

export default MapRecordList;
