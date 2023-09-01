import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import styles from "./MapRecordForm.module.css";

function MapRecordForm() {
  const navigate = useNavigate();
  const [isRatingVisible, setIsRatingVisible] = useState(false);
  const [newdate, setNewDate] = useState(new Date());

  return (
    <div className={styles.container}>
      <form className={styles.formContainer}>
        <div className={styles.topFormContainer}>
          {/* <img
            src={`https://flagcdn.com/w80/${countryCode}.png`}
            width="80"
            alt="flag"
          /> */}
          <div>
            <h2>Country:</h2>
            <h3>City: </h3>
          </div>
        </div>

        <div className={styles.centerFormContainer}>
          <div className={styles.date}>
            <label htmlFor="date">Date: </label>
            <DatePicker
              id="date"
              onChange={(date) => setNewDate(date)}
              selected={newdate}
              dateFormat="MMM dd, yyyy"
            />
          </div>

          <div className={styles.status}>
            <label htmlFor="status">Status: </label>
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
          </div>

          {isRatingVisible && (
            <div className={styles.rating}>
              <label htmlFor="rating">Rating: </label>
              <select id="rating">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
          )}

          <div className={styles.description}>
            <label htmlFor="description">Description: </label>

            <textarea id="description" rows={3} />
          </div>
        </div>

        <div className={styles.bottomFormContainer}>
          <button
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
              setIsRatingVisible(false);
            }}
          >
            Cancel
          </button>
          <button onClick={(e) => e.preventDefault()}>Confirm</button>
        </div>
      </form>
    </div>
  );
}

export default MapRecordForm;
