import { useNavigate, useParams } from "react-router-dom";

import styles from "./MapRecord.module.css";

// only for test
import records from "../../../testData";

function MapRecord() {
  const navigate = useNavigate();
  const { id } = useParams();

  // test temp
  const record = records.find((r) => r.id === Number(id));
  const { countryCode, country, cityName, date, notes, status, rating } =
    record;

  const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(new Date(date));

  return (
    <div className={styles.container}>
      <form className={styles.formContainer}>
        <div className={styles.topFormContainer}>
          <img
            src={`https://flagcdn.com/w80/${countryCode}.png`}
            width="80"
            alt="flag"
          />
          <div>
            <h2>{country}</h2>
            <h3>{cityName}</h3>
          </div>
        </div>

        <div className={styles.centerFormContainer}>
          <div className={styles.innerCenterFormContainer}>
            <div>
              <h3>Date</h3>
              <p>{formatDate(date || null)}</p>
            </div>
            <div className={styles.status}>{status}</div>
          </div>

          {rating && (
            <div>
              <h3>Your Rating:</h3>
              <p>{rating}</p>
            </div>
          )}

          <div>
            <h3>Your notes</h3>
            <p>{notes}</p>
          </div>
        </div>

        <div className={styles.bottomFormContainer}>
          <button
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
          >
            Back
          </button>
          <button onClick={(e) => e.preventDefault()}>Modify</button>
          <button onClick={(e) => e.preventDefault()}>Delete</button>
        </div>
      </form>
    </div>
  );
}

export default MapRecord;
