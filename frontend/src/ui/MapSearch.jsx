import { useState } from "react";

import styles from "./MapSearch.module.css";

const OPENCAGE_BASE_URL = "https://api.opencagedata.com/geocode/v1/json?";

function MapSearch({ setSelectPosition }) {
  const [searchText, setSearchText] = useState("");
  const [listPlace, setListPlace] = useState([]);

  const handleSearch = async () => {
    if (searchText.length <= 1) return;

    const params = {
      q: searchText,
      key: import.meta.env.VITE_OPENCAGE_API_KEY,
      language: "en",
      no_annotations: 1,
      pretty: 1,
    };

    const queryString = new URLSearchParams(params).toString();

    try {
      const response = await fetch(`${OPENCAGE_BASE_URL}${queryString}`);
      const searchedData = await response.json();
      setListPlace(searchedData.results);
    } catch (err) {
      console.log("Request api happen error!");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.topContainer}>
        <i className="fa-solid fa-magnifying-glass" onClick={handleSearch} />
        <input
          type="search"
          placeholder="Search for country or city"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
            setListPlace([]);
          }}
        />
      </div>

      <div className={styles.bottomContainer}>
        {listPlace && (
          <ul>
            {listPlace.map((item, id) => {
              return (
                <li
                  key={id}
                  onClick={() => {
                    setSelectPosition(item);
                  }}
                >
                  {item.formatted}
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
