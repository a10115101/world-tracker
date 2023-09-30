import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";

import BasicInfo from "./form/BasicInfo";
import Status from "./form/Status";
import Rating from "./form/Rating";
import Desciption from "./form/Desciption";
import SwitchModeButton from "./button/SwitchModeButton";
import UpdateRecordButton from "./button/UpdateRecordButton";
import DeleteRecordButton from "./button/DeleteRecordButton";
import CancelButton from "./button/CancelButton";
import { getRecord } from "src/services/apiRecord";
import { formatDate } from "src/utilities/format";
import styles from "./MapRecord.module.css";

function MapRecord() {
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

  if (isLoading) return <h2>Loading...</h2>;

  if (loadingError) return <h2>{loadingError}</h2>;

  return (
    <div className={styles.container}>
      <form className={styles.formContainer}>
        <div className={styles.topFormContainer}>
          <BasicInfo record={record} />
        </div>

        <div className={styles.centerFormContainer}>
          <Status
            mode={mode}
            record={record}
            status={currentStatus}
            setStatus={setCurrentStatus}
          />

          {mode === "normal" && (
            <div className={styles.date}>
              <h3 htmlFor="date">Date: </h3>
              <p>{formatDate(record.date || null)}</p>
            </div>
          )}

          {mode === "update" && (
            <div className={styles.date}>
              <label htmlFor="date">Date: </label>
              <DatePicker
                id="date"
                onChange={(date) => setCurrentDate(date)}
                selected={currentDate}
                maxDate={currentStatus === "visited" && new Date()}
                minDate={currentStatus === "planning" && new Date()}
                dateFormat="MMM dd, yyyy"
              />
            </div>
          )}

          <Rating
            mode={mode}
            record={record}
            rating={currentRating}
            setRating={setCurrentRating}
            currentStatus={currentStatus}
          />

          <Desciption
            mode={mode}
            record={record}
            description={currentDescription}
            setDescription={setCurrentDescription}
          />
        </div>

        <div className={styles.bottomFormContainer}>
          {mode === "normal" && (
            <>
              <CancelButton>Back</CancelButton>
              <SwitchModeButton setMode={setMode} mode={"update"}>
                Update
              </SwitchModeButton>
              <DeleteRecordButton id={id}>Delete</DeleteRecordButton>
            </>
          )}

          {mode === "update" && (
            <>
              <SwitchModeButton setMode={setMode} mode={"normal"}>
                Cancel
              </SwitchModeButton>
              <UpdateRecordButton
                id={id}
                updateRecordObject={updateRecordObject}
              >
                Confirm
              </UpdateRecordButton>
            </>
          )}
        </div>
      </form>
    </div>
  );
}

export default MapRecord;
