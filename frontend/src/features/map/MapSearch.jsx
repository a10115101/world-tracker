import { useState } from "react";

import styles from "./MapSearch.module.css";
import { useSearch } from "../../contexts/SearchContext";
import { getGeocoding } from "../../services/apiGeocoding";

function MapSearch() {
  const { setSelectedPosition, setIsMapSearchMarkerVisible } = useSearch();

  const [searchedText, setSearchedText] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchedResults, setSearchedResults] = useState([]);
  const [searchingError, setSearchingError] = useState("");

  const handleSearch = async () => {
    if (searchedText.length <= 1) return;

    try {
      setIsSearching(true);
      setSearchingError("");

      const searchedData = await getGeocoding(searchedText);

      if (!searchedData)
        throw new Error("Not found it, please search for another place again.");

      setSearchedResults(searchedData);
    } catch (err) {
      setSearchingError(err.message);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.topContainer}>
        {!isSearching ? (
          <>
            <i
              className="fa-solid fa-magnifying-glass"
              onClick={handleSearch}
            />
            <input
              type="search"
              placeholder="Search for country or city"
              value={searchedText}
              onChange={(e) => {
                setSearchedText(e.target.value);
                setSearchedResults([]);
              }}
            />
          </>
        ) : (
          <>
            <i className="fa-solid fa-magnifying-glass" />
            <input
              type="search"
              placeholder="Search for country or city"
              disabled={true}
              value={"Searching..."}
            />
          </>
        )}
      </div>

      <div className={styles.bottomContainer}>
        {searchedResults && (
          <ul>
            {searchedResults.map((searchedResult, id) => {
              return (
                <li
                  key={id}
                  onClick={() => {
                    setSelectedPosition(searchedResult);
                    setIsMapSearchMarkerVisible(true);
                  }}
                >
                  {searchedResult.formatted}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

export default MapSearch;
