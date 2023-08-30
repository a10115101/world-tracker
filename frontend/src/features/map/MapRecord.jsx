import { useNavigate, useParams } from "react-router-dom";

import styles from "./MapRecord.module.css";

// only for test
import records from "../../../testData";

function MapRecord() {
  const navigate = useNavigate();
  const { id } = useParams();

  // test temp
  const record = records.find((r) => r.id === Number(id));
  const { countryCode, country, cityName, date, notes } = record;

  const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(new Date(date));

  return (
    <div className={styles.container}>
      <form>
        <div>
          <h2>{country}</h2>
          <h4>{cityName}</h4>
        </div>

        <div>
          <p>City name</p>
          <p>{cityName}</p>
        </div>

        <div>
          <p>Date</p>
          <p>{formatDate(date || null)}</p>
        </div>

        <div>
          <p>Your notes</p>
          <p>{notes}</p>
        </div>

        <div>
          <button
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
}

export default MapRecord;
