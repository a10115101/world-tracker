import { Link } from "react-router-dom";

import styles from "./MapRecordListItem.module.css";

import { useSearch } from "../../contexts/SearchContext";

function MapRecordListItem({ record }) {
  const { setIsVisibleMarker } = useSearch();

  const { id, countryCode, country, cityName, date, position } = record;

  const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(new Date(date));

  return (
    <li className={styles.container}>
      <Link
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
        onClick={() => setIsVisibleMarker(false)}
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
