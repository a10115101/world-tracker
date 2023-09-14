import { Link } from "react-router-dom";

import styles from "./MapRecordListItem.module.css";

import { useSearch } from "../../contexts/SearchContext";

function MapRecordListItem({ record }) {
  const { setIsMapSearchMarkerVisible } = useSearch();

  const { _id, countryCode, country, cityName, date, position } = record;
  // console.log(_id, countryCode, country, cityName, date, position.coordinates);

  const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(new Date(date));

  return (
    <li className={styles.container}>
      <Link
        to={`${_id}?lat=${position.coordinates[1]}&lng=${position.coordinates[0]}`}
        onClick={() => setIsMapSearchMarkerVisible(false)}
      >
        <span>
          <img
            src={`https://flagcdn.com/w20/${countryCode}.png`}
            width="20"
            alt="flag"
          />
        </span>
        <h3>{country}</h3>
        <h3>{cityName}</h3>
        <time>{formatDate(date)}</time>
        <i className="fa-solid fa-location-dot" />
      </Link>
    </li>
  );
}

export default MapRecordListItem;
