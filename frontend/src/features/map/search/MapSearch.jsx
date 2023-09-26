import { useState } from "react";

import MapSearchList from "./MapSearchList";
import { getGeocoding } from "src/services/apiGeocoding";
import styles from "./MapSearch.module.css";

function MapSearch() {
  const [isListOpened, setIsListOpened] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchedText, setSearchedText] = useState("");
  const [searchingError, setSearchingError] = useState("");
  const [searchedResults, setSearchedResults] = useState([]);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      if (searchedText.length <= 1) return;

      setIsSearching(true);
      setSearchingError("");

      const data = await getGeocoding(searchedText);

      if (data.length === 0)
        throw new Error("Not found it, please search for another place again.");

      setSearchedResults(data);
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
      onClick={() => setIsListOpened(!isListOpened)}
    >
      <div className={styles.topContainer}>
        <form onSubmit={handleSubmit}>
          <button>
            <i className="fa-solid fa-magnifying-glass" />
          </button>

          {isSearching && (
            <input type="search" disabled={isSearching} value="Searching..." />
          )}

          {!isSearching && (
            <input
              type="search"
              placeholder="Search for country or city"
              value={searchingError ? searchingError : searchedText}
              onChange={(e) => {
                setSearchedText(e.target.value);
                setSearchedResults([]);
                setSearchingError("");
              }}
            />
          )}
        </form>
      </div>

      {isListOpened && <MapSearchList searchedResults={searchedResults} />}
    </div>
  );
}

export default MapSearch;
