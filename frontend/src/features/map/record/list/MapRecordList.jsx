import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import MapRecordListItem from "./MapRecordListItem";

import { useRecords } from "src/contexts/RecordsContext";
import { useSearch } from "src/contexts/SearchContext";
import { getAllRecords } from "src/services/apiRecord";
import styles from "./MapRecordList.module.css";

function MapRecordList() {
  const { setIsFormOpened, records, setRecords, statusMode, dateMode } =
    useRecords();

  const { setIsMapSearchMarkerVisible } = useSearch();

  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState("");

  useEffect(function () {
    setIsMapSearchMarkerVisible(false);
    setIsFormOpened(false);
  }, []);

  useEffect(
    function () {
      async function getData() {
        try {
          setIsLoading(true);
          setLoadingError("");

          const data = await getAllRecords();

          if (statusMode === "all" && dateMode === "des")
            setRecords(
              data.slice().sort((a, b) => new Date(b.date) - new Date(a.date))
            );

          if (statusMode === "all" && dateMode === "asc")
            setRecords(
              data.slice().sort((a, b) => new Date(a.date) - new Date(b.date))
            );

          if (statusMode === "visited" && dateMode === "des")
            setRecords(
              data
                .slice()
                .filter((d) => d.status === "visited")
                .sort((a, b) => new Date(b.date) - new Date(a.date))
            );

          if (statusMode === "visited" && dateMode === "asc")
            setRecords(
              data
                .slice()
                .filter((d) => d.status === "visited")
                .sort((a, b) => new Date(a.date) - new Date(b.date))
            );

          if (statusMode === "planning" && dateMode === "des")
            setRecords(
              data
                .slice()
                .filter((d) => d.status === "planning")
                .sort((a, b) => new Date(b.date) - new Date(a.date))
            );

          if (statusMode === "planning" && dateMode === "asc")
            setRecords(
              data
                .slice()
                .filter((d) => d.status === "planning")
                .sort((a, b) => new Date(a.date) - new Date(b.date))
            );
        } catch (err) {
          setLoadingError("Loading Error");
        } finally {
          setIsLoading(false);
        }
      }

      getData();
    },
    [statusMode, dateMode]
  );

  if (isLoading) return <p>Loading...</p>;

  if (loadingError) return <p>{loadingError}</p>;

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
