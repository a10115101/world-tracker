import styles from "./form.module.css";

function Status({ mode, record, status, setStatus }) {
  return (
    <div className={styles.status}>
      <label htmlFor="status">Status: </label>
      {mode === "normal" && <p>{record.status}</p>}
      {mode === "update" && (
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="planning">Planning</option>
          <option value="visited">Visited</option>
        </select>
      )}
    </div>
  );
}

export default Status;
