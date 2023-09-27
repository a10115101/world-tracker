import { formatFirstCharUpperCase } from "src/utilities/format";
import styles from "./form.module.css";

function Status({ mode, record, status, setStatus }) {
  return (
    <>
      {mode === "normal" && (
        <div className={styles.status}>
          <h3 htmlFor="status">Status: </h3>
          <p>{record.status && formatFirstCharUpperCase(record.status)}</p>
        </div>
      )}

      {mode === "update" && (
        <div className={styles.status}>
          <label htmlFor="status">Status: </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="planning">Planning</option>
            <option value="visited">Visited</option>
          </select>
        </div>
      )}
    </>
  );
}

export default Status;
