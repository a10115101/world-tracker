import { useSearch } from "src/contexts/SearchContext";
import styles from "./MapSearchList.module.css";

function MapSearchList({ searchedResults }) {
  const { setSelectedPosition, setIsMapSearchMarkerVisible } = useSearch();

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
