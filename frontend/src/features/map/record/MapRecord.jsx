import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import UpdateRecordButton from "./button/UpdateRecordButton";
import DeleteRecordButton from "./button/DeleteRecordButton";

import { getRecord } from "src/services/apiRecord";
import { formatDate } from "src/utilities/format";
import styles from "./MapRecord.module.css";

function MapRecord() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [mode, setMode] = useState("normal");

  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState("");
  const [record, setRecord] = useState({});

  const [currentDate, setCurrentDate] = useState("");
  const [currentStatus, setCurrentStatus] = useState("");
  const [currentRating, setCurrentRating] = useState("");
  const [currentDescription, setCurrentDescription] = useState("");

  const updateRecordObject = {
    date: currentDate,
    status: currentStatus,
    rating: currentRating,
    description: currentDescription,
  };

  useEffect(
    function () {
      async function getRecordData() {
        try {
          setIsLoading(true);
          setLoadingError("");

          const data = await getRecord(id);
          setRecord(data);

          setCurrentDate(new Date(data.date));
          setCurrentStatus(data.status);
          setCurrentRating(data.rating);
          setCurrentDescription(data.description);
        } catch (err) {
          setLoadingError("Loading Record Error!");
        } finally {
          setIsLoading(false);
        }
      }

      getRecordData();
      setMode("normal");
    },

    [id]
  );

  if (isLoading) return <p>Loading...</p>;

  if (loadingError) return <p>{loadingError}</p>;

  return (
    <div className={styles.container}>
      <form className={styles.formContainer}>
        <div className={styles.topFormContainer}>
          <img
            src={`https://flagcdn.com/w80/${record.countryCode}.png`}
            width="80"
            alt="flag"
          />
          <div>
            <h2>Country: {record.country}</h2>
            <h3>City: {record.cityName}</h3>
          </div>
        </div>

        <div className={styles.centerFormContainer}>
          <div className={styles.status}>
            <label htmlFor="status">Status: </label>
            {mode === "normal" && <p>{record.status}</p>}
            {mode === "update" && (
              <select
                id="status"
                value={currentStatus}
                onChange={(e) => setCurrentStatus(e.target.value)}
              >
                <option value="planning">Planning</option>
                <option value="visited">Visited</option>
              </select>
            )}
          </div>

          <div className={styles.date}>
            <label htmlFor="date">Date: </label>
            {mode === "normal" && <p>{formatDate(record.date || null)}</p>}
            {mode === "update" && (
              <DatePicker
                id="date"
                onChange={(date) => setCurrentDate(date)}
                selected={currentDate}
                maxDate={currentStatus === "visited" && new Date()}
                minDate={currentStatus === "planning" && new Date()}
                dateFormat="MMM dd, yyyy"
              />
            )}
          </div>

          {mode === "normal" && record.status === "visited" && (
            <div className={styles.rating}>
              <label htmlFor="rating">Rating: </label>
              <p>{record.rating}</p>
            </div>
          )}

          {mode === "update" && currentStatus === "visited" && (
            <div className={styles.rating}>
              <label htmlFor="rating">Rating: </label>
              <select
                id="rating"
                value={currentRating}
                onChange={(e) => setCurrentRating(e.target.value)}
              >
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
            {mode === "normal" && <p>{record.description}</p>}
            {mode === "update" && (
              <textarea
                id="description"
                rows={3}
                value={currentDescription}
                onChange={(e) => setCurrentDescription(e.target.value)}
              />
            )}
          </div>
        </div>

        <div className={styles.bottomFormContainer}>
          {mode === "normal" && (
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
                  setMode("update");
                }}
              >
                Update
              </button>
              <DeleteRecordButton id={id} />
            </>
          )}
          {mode === "update" && (
            <>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setMode("normal");
                }}
              >
                Cancel
              </button>
              <UpdateRecordButton
                id={id}
                updateRecordObject={updateRecordObject}
              />
            </>
          )}
        </div>
      </form>
    </div>
  );
}

export default MapRecord;
