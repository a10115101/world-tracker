import { useState } from "react";

import styles from "./MapSearch.module.css";
import { useSearch } from "../../contexts/SearchContext";

function MapSearch() {
  const { setSelectedPosition, setIsVisibleMarker } = useSearch();

  const [searchedText, setSearchedText] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchedResults, setSearchedResults] = useState([]);
  const [searchingError, setSearchingError] = useState("");

  const handleSearch = async () => {
    if (searchedText.length <= 1) return;

    try {
      setIsSearching(true);
      setSearchingError("");

      const params = {
        q: searchedText,
        key: import.meta.env.VITE_OPENCAGE_API_KEY,
        language: "en",
        no_annotations: 1,
        pretty: 1,
      };

      const queryString = new URLSearchParams(params).toString();

      const response = await fetch(
        `${import.meta.env.VITE_OPENCAGE_BASE_URL}${queryString}`
      );
      const searchedData = await response.json();

      if (!searchedData)
        throw new Error("Not found it, please search for another place again.");

      setSearchedResults(searchedData.results);
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
                    setIsVisibleMarker(true);
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
