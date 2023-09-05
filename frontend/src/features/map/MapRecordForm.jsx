import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import styles from "./MapRecordForm.module.css";
import { useRecords } from "../../contexts/RecordsContext";
import { getGeocoding } from "../../services/apiGeocoding";

function MapRecordForm() {
  const { setIsFormOpened, clickMapPosition, setMapPosition, isClicked } =
    useRecords();

  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [countryCode, setCountryCode] = useState("");
  const [country, setCountry] = useState("");
  const [cityName, setCityName] = useState("");
  const [geocodingError, setGeocodingError] = useState("");

  const navigate = useNavigate();
  const [isRatingVisible, setIsRatingVisible] = useState(false);
  const [newdate, setNewDate] = useState(new Date());

  useEffect(
    function () {
      async function getLocationInfo() {
        try {
          setIsLoadingGeocoding(true);
          setGeocodingError("");

          const searchedData = await getGeocoding(
            `${clickMapPosition[0]},+${clickMapPosition[1]}`
          );

          const data = searchedData[0]?.components;

          if (!data.country_code || data === undefined)
            throw new Error(
              "Oops! It doesn't seem like a country or a city. Please click somewhere else on the map"
            );

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

    [clickMapPosition]
  );

  if (!isClicked) return <div>Start by clicking somewhere on the map</div>;

  if (isLoadingGeocoding) return <div>Loading...</div>;

  if (!clickMapPosition)
    return <div>Can not find this position on the map</div>;

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
              setIsFormOpened(false);
              setMapPosition(clickMapPosition);
            }}
          >
            Cancel
          </button>
          <button onClick={(e) => e.preventDefault()}>Add</button>
        </div>
      </form>
    </div>
  );
}

export default MapRecordForm;
