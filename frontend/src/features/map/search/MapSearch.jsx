import { useState } from "react";

import { useSearch } from "src/contexts/SearchContext";
import { getGeocoding } from "src/services/apiGeocoding";
import styles from "./MapSearch.module.css";

function MapSearch() {
  const { setSelectedPosition, setIsMapSearchMarkerVisible } = useSearch();

  const [searchedText, setSearchedText] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchedResults, setSearchedResults] = useState([]);
  const [searchingError, setSearchingError] = useState("");

  const [isListOpened, setIsListOpened] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (searchedText.length <= 1) return;

    try {
      setIsSearching(true);
      setSearchingError("");

      const searchedData = await getGeocoding(searchedText);

      if (!searchedData)
        throw new Error("Not found it, please search for another place again.");

      setSearchedResults(searchedData);
      // isListOpened.current = true;
      setIsListOpened(true);
    } catch (err) {
      setSearchingError(err.message);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div
      className={styles.container}
      onClick={() => {
        setIsListOpened(!isListOpened);
      }}
    >
      <div className={styles.topContainer}>
        <form onSubmit={handleSubmit}>
          <button>
            <i className="fa-solid fa-magnifying-glass" />
          </button>
          {isSearching ? (
            <input
              type="search"
              placeholder="Search for country or city"
              disabled={isSearching}
              value="Searching..."
            />
          ) : (
            <input
              type="search"
              placeholder="Search for country or city"
              disabled={isSearching}
              value={searchedText}
              onChange={(e) => {
                setSearchedText(e.target.value);
                setSearchedResults([]);
              }}
            />
          )}
        </form>
      </div>

      {searchedResults && isListOpened && (
        <div className={styles.bottomContainer}>
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
        </div>
      )}
    </div>
  );
}

export default MapSearch;
