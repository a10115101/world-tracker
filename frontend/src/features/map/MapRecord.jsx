import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
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
  const [isRatingVisible, setIsRatingVisible] = useState(false);
  const [newdate, setNewDate] = useState(date ? new Date(date) : new Date());

  useEffect(function () {
    if (status === "visited") setIsRatingVisible(true);
  }, []);

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
                dateFormat="MMM dd, yyyy"
              />
            )}
          </div>

          <div className={styles.status}>
            <label htmlFor="status">Status: </label>
            {!isModified ? (
              <p>{status}</p>
            ) : (
              <select
                id="status"
                defaultValue={status}
                onChange={(e) => {
                  if (e.target.value === "visited") {
                    setIsRatingVisible(true);
                  } else {
                    setIsRatingVisible(false);
                  }
                }}
              >
                <option value="plannig">Plannig</option>
                <option value="visited">Visited</option>
              </select>
            )}
          </div>

          {isRatingVisible && (
            <div className={styles.rating}>
              <label htmlFor="rating">Rating: </label>
              {!isModified ? (
                <p>{rating}</p>
              ) : (
                <select id="rating" defaultValue={rating}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              )}
            </div>
          )}

          <div className={styles.description}>
            <label htmlFor="description">Description: </label>
            {!isModified ? (
              <p>{description}</p>
            ) : (
              <textarea id="description" rows={3} defaultValue={description} />
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
                  setIsRatingVisible(false);
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
