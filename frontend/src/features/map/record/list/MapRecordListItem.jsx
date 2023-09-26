import { Link } from "react-router-dom";

import { formatDate } from "src/utilities/format";
import styles from "./MapRecordListItem.module.css";

function MapRecordListItem({ record }) {
  const { _id, countryCode, country, cityName, date, position } = record;

  const lng = position.coordinates[0];
  const lat = position.coordinates[1];

  return (
    <li className={styles.container}>
      <Link to={`${_id}?lat=${lat}&lng=${lng}`}>
        <span>
          <img
            src={`https://flagcdn.com/w20/${countryCode}.png`}
            width="20"
            alt="flag"
          />
        </span>
        <h3>{country}</h3>
        <h3>{cityName}</h3>
        <p>{formatDate(date)}</p>
        <i className="fa-solid fa-location-dot" />
      </Link>
    </li>
  );
}

export default MapRecordListItem;
