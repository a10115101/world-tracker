import { Link } from "react-router-dom";

import styles from "./MapRecordListItem.module.css";

function MapRecordListItem({ record }) {
  const { id, countryCode, country, cityName, date } = record;

  const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(new Date(date));

  return (
    <li className={styles.container}>
      <Link to={`${id}`}>
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
