import { Link } from "react-router-dom";

import { formatDate } from "src/utilities/format";
import styles from "./MapRecordListItem.module.css";

function MapRecordListItem({ record }) {
  const { _id, countryCode, country, cityName, date, position, status } =
    record;

  const lng = position.coordinates[0];
  const lat = position.coordinates[1];

  return (
    <li className={styles.container}>
      <Link to={`${_id}?lat=${lat}&lng=${lng}`}>
        <div className={styles.frontContainer}>
          <img
            className={styles.flag}
            src={`https://flagcdn.com/w40/${countryCode}.png`}
            width="40"
            alt="flag"
          />
        </div>
        <div className={styles.centerContainer}>
          <h4>{country}</h4>
          <p>{cityName}</p>
        </div>
        <div className={styles.backContainer}>
          <p>{formatDate(date)}</p>
          <img
            src={status === "visited" ? "/green-pin.png" : "/yellow-pin.png"}
            width="30"
            alt="pin"
          />
        </div>
      </Link>
    </li>
  );
}

export default MapRecordListItem;
