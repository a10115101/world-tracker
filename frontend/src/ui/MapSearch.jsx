import { useState } from "react";

import styles from "./MapSearch.module.css";

const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";

function MapSearch() {
  const [searchText, setSearchText] = useState("");
  const [listPlace, setListPlace] = useState([]);

  const handleSearch = async () => {
    if (!searchText) return;

    const params = {
      q: searchText,
      format: "json",
      addressdetails: 1,
      polygon_geojson: 0,
      "accept-language": "en",
    };

    const queryString = new URLSearchParams(params).toString();

    try {
      const response = await fetch(`${NOMINATIM_BASE_URL}${queryString}`);
      const searchedData = await response.json();
      setListPlace(searchedData);
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
            {listPlace.map((item) => {
              return <li key={item?.osm_id}>{item.display_name}</li>;
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

export default MapSearch;
