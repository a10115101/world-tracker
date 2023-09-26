import { useMapSearch } from "src/contexts/MapSearchContext";
import styles from "./MapSearchList.module.css";

function MapSearchList({ searchedResults }) {
  const { setSelectedPosition, setIsMapSearchMarkerVisible } = useMapSearch();

  return (
    <div className={styles.container}>
      <ul>
        {searchedResults.map((searchedResult, id) => (
          <li
            key={id}
            onClick={() => {
              setSelectedPosition(searchedResult);
              setIsMapSearchMarkerVisible(true);
            }}
          >
            {searchedResult.formatted}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MapSearchList;
