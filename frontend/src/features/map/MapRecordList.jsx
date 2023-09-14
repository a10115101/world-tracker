import { Link } from "react-router-dom";
import { useEffect } from "react";

import styles from "./MapRecordList.module.css";
import MapRecordListItem from "./MapRecordListItem";

import { useRecords } from "../../contexts/RecordsContext";
import { useSearch } from "../../contexts/SearchContext";
import { getAllRecords } from "../../services/apiRecord";

function MapRecordList() {
  const { setIsFormOpened, records, setRecords } = useRecords();
  const { setIsMapSearchMarkerVisible } = useSearch();

  // const [records, setRecords] = useState([]);

  // initialize status for first time render
  useEffect(function () {
    setIsMapSearchMarkerVisible(false);
    setIsFormOpened(false);
  }, []);

  useEffect(function () {
    async function getData() {
      const response = await getAllRecords();
      setRecords(response.data.data.records);
    }

    getData();
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
            <MapRecordListItem record={record} key={record._id} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MapRecordList;
