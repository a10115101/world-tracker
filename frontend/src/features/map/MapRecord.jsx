import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import styles from "./MapRecord.module.css";

// only for test
import records from "../../../testData";

function MapRecord() {
  const navigate = useNavigate();
  const { id } = useParams();

  // test temp
  const record = records.find((r) => r.id === Number(id));
  const { countryCode, country, cityName, date, description, status, rating } =
    record;

  const [isModified, setIsModified] = useState(false);
  const [newdate, setNewDate] = useState(new Date());

  const formatDate = (formattedDate) =>
    new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(new Date(formattedDate));

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
            <h2>Country: {country}</h2>
            <h3>City: {cityName}</h3>
          </div>
        </div>

        <div className={styles.centerFormContainer}>
          <div className={styles.date}>
            <label htmlFor="date">Date: </label>
            {!isModified ? (
              <p>{formatDate(date || null)}</p>
            ) : (
              <DatePicker
                id="date"
                onChange={(date) => setNewDate(date)}
                selected={newdate}
                dateFormat="dd/MM/yyyy"
                portalId="root-portal"
                popperClassName={styles.datePicker}
                wrapperClassName=""
              />
            )}
          </div>

          <div className={styles.status}>
            <label htmlFor="status">Status: </label>
            {!isModified ? (
              <p>{status}</p>
            ) : (
              <select id="status">
                <option value="">Plannig</option>
                <option value="">Visited</option>
              </select>
            )}
          </div>

          <div className={styles.rating}>
            <label htmlFor="rating">Rating: </label>
            {!isModified ? (
              <p>{rating}</p>
            ) : (
              <select id="rating">
                <option value="">1</option>
                <option value="">2</option>
                <option value="">3</option>
                <option value="">4</option>
                <option value="">5</option>
              </select>
            )}
          </div>

          <div>
            <label htmlFor="description">Description: </label>
            {!isModified ? (
              <p>{description}</p>
            ) : (
              <textarea id="description" rows={3} />
            )}
          </div>
        </div>

        <div className={styles.bottomFormContainer}>
          {!isModified ? (
            <>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  navigate(-1);
                }}
              >
                Back
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setIsModified(true);
                }}
              >
                Modify
              </button>
              <button onClick={(e) => e.preventDefault()}>Delete</button>
            </>
          ) : (
            <>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setIsModified(false);
                }}
              >
                Cancel
              </button>
              <button onClick={(e) => e.preventDefault()}>Confirm</button>
            </>
          )}
        </div>
      </form>
    </div>
  );
}

export default MapRecord;
