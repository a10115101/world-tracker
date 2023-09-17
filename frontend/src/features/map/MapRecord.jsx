import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useRecords } from "../../contexts/RecordsContext";
import { formatDate } from "../../utilities/format";
import { deleteRecord, updateRecord } from "../../services/apiRecord";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import { options } from "../../utilities/snackbar";
import styles from "./MapRecord.module.css";

function MapRecord() {
  const navigate = useNavigate();
  const { records } = useRecords();
  const { id } = useParams();

  const record = records.find((r) => r._id === `${id}`);
  const { countryCode, country, cityName, date, description, status, rating } =
    record;

  const [isModified, setIsModified] = useState(false);
  const [isRatingVisible, setIsRatingVisible] = useState(false);
  const [newdate, setNewDate] = useState(date ? new Date(date) : new Date());
  const [currentStatus, setCurrentStatus] = useState(status);
  const [currentRating, setCurrentRating] = useState(rating);
  const [currentDescription, setCurrentDescription] = useState(description);

  const handleModified = async (e) => {
    try {
      e.preventDefault();
      const updateRecordObject = {
        date: newdate,
        status: currentStatus,
        rating: currentRating,
        description: currentDescription,
      };
      await updateRecord(id, updateRecordObject);
      enqueueSnackbar("Success Update!", options("success"));
      navigate("/map");
    } catch (err) {
      const errorMessage = err.response.data.message;
      enqueueSnackbar(errorMessage, options("error"));
    }
  };

  const handleDeleteConfirm = async (e) => {
    e.preventDefault();
    enqueueSnackbar("Are you sure?", {
      ...options("warning"),
      action: (key) => (
        <div>
          <button onClick={handleDelete}>Yes</button>
          <button
            onClick={() => {
              closeSnackbar(key);
            }}
          >
            No
          </button>
        </div>
      ),
    });
  };

  const handleDelete = async (e) => {
    try {
      e.preventDefault();
      await deleteRecord(id);
      enqueueSnackbar("Success Delete!", options("success"));
      navigate("/map");
    } catch (err) {
      const errorMessage = err.response.data.message;
      enqueueSnackbar(errorMessage, options("error"));
    }
  };

  useEffect(function () {
    if (status === "visited") setIsRatingVisible(true);
  }, []);

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
                value={currentStatus}
                onChange={(e) => {
                  if (e.target.value === "visited") {
                    setIsRatingVisible(true);
                    setCurrentStatus(e.target.value);
                  } else {
                    setIsRatingVisible(false);
                    setCurrentStatus(e.target.value);
                  }
                }}
              >
                <option></option>
                <option value="planning">Planning</option>
                <option value="visited">Visited</option>
              </select>
            )}
          </div>

          {(isRatingVisible || currentStatus === "visited") && (
            <div className={styles.rating}>
              <label htmlFor="rating">Rating: </label>
              {!isModified ? (
                <p>{rating}</p>
              ) : (
                <select
                  id="rating"
                  value={currentRating}
                  onChange={(e) => {
                    setCurrentRating(e.target.value);
                  }}
                >
                  <option></option>
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
              <textarea
                id="description"
                rows={3}
                value={currentDescription}
                onChange={(e) => {
                  setCurrentDescription(e.target.value);
                }}
              />
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
              <button onClick={handleDeleteConfirm}>Delete</button>
            </>
          ) : (
            <>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setIsModified(false);
                  setIsRatingVisible(false);
                  setNewDate(new Date(date));
                  setCurrentStatus(status);
                  setCurrentRating(rating);
                  setCurrentDescription(description);
                }}
              >
                Cancel
              </button>
              <button onClick={handleModified}>Confirm</button>
            </>
          )}
        </div>
      </form>
    </div>
  );
}

export default MapRecord;
