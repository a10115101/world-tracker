import { Link } from "react-router-dom";

import { useSearch } from "../../contexts/SearchContext";
import { formatDate } from "../../utilities/formatDate";
import styles from "./MapRecordListItem.module.css";

function MapRecordListItem({ record }) {
  const { setIsMapSearchMarkerVisible } = useSearch();

  const { _id, countryCode, country, cityName, date, position } = record;

  const lng = position.coordinates[0];
  const lat = position.coordinates[1];

  return (
    <li className={styles.container}>
      <Link
        to={`${_id}?lat=${lat}&lng=${lng}`}
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
