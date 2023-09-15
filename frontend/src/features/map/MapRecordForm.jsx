import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useRecords } from "../../contexts/RecordsContext";
import { getGeocoding } from "../../services/apiGeocoding";
import { creataRecord } from "../../services/apiRecord";
import { options } from "../../utilities/snackbar";
import styles from "./MapRecordForm.module.css";

function MapRecordForm() {
  const { setIsFormOpened, mapPosition, isClicked } = useRecords();
  const navigate = useNavigate();

  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [continent, setContinent] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [country, setCountry] = useState("");
  const [cityName, setCityName] = useState("");
  const [geocodingError, setGeocodingError] = useState("");

  const [isRatingVisible, setIsRatingVisible] = useState(false);
  const [newdate, setNewDate] = useState(new Date());
  const [status, setStatus] = useState("");
  const [rating, setRating] = useState("");
  const [description, setDescription] = useState("");

  const handleClick = async (e) => {
    try {
      e.preventDefault();

      const lat = mapPosition[0];
      const lng = mapPosition[1];
      const recordObject = {
        continent,
        country,
        countryCode,
        cityName,
        date: newdate,
        status,
        rating,
        position: {
          coordinates: [lng, lat],
        },
        description,
      };

      await creataRecord(recordObject);
      enqueueSnackbar("Success Creation!", options("success"));
      navigate("/map");
    } catch (err) {
      const errorMessage = err.response.data.message;
      enqueueSnackbar(errorMessage, options("error"));
    }
  };

  useEffect(
    function () {
      async function getLocationInfo() {
        try {
          setIsLoadingGeocoding(true);
          setGeocodingError("");

          const searchedData = await getGeocoding(
            `${mapPosition[0]},+${mapPosition[1]}`
          );

          const data = searchedData[0]?.components;
          console.log(data);

          if (!data.country_code || data === undefined)
            throw new Error(
              "Oops! It doesn't seem like a country or a city. Please click somewhere else on the map"
            );

          setContinent(data.continent);
          setCountryCode(data.country_code);
          setCountry(data.country);
          setCityName(
            data.city ||
              data.county ||
              data.village ||
              data.town ||
              data.neighbourhood ||
              data.state
          );
        } catch (err) {
          setGeocodingError(err.message);
        } finally {
          setIsLoadingGeocoding(false);
        }
      }

      getLocationInfo();
    },

    [mapPosition]
  );

  if (!isClicked) return <div>Start by clicking somewhere on the map</div>;

  if (isLoadingGeocoding) return <div>Loading...</div>;

  if (!mapPosition) return <div>Can not find this position on the map</div>;

  if (geocodingError) return <div>{geocodingError}</div>;

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
              value={status}
              onChange={(e) => {
                if (e.target.value === "visited") {
                  setIsRatingVisible(true);
                  setStatus(e.target.value);
                } else {
                  setIsRatingVisible(false);
                  setStatus(e.target.value);
                }
              }}
            >
              <option></option>
              <option value="planning">Planning</option>
              <option value="visited">Visited</option>
            </select>
          </div>

          {isRatingVisible && (
            <div className={styles.rating}>
              <label htmlFor="rating">Rating: </label>
              <select
                id="rating"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              >
                <option></option>
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
            <textarea
              id="description"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.bottomFormContainer}>
          <button
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
              setIsRatingVisible(false);
              setIsFormOpened(false);
            }}
          >
            Cancel
          </button>
          <button onClick={handleClick}>Add</button>
        </div>
      </form>
    </div>
  );
}

export default MapRecordForm;
