import styles from "./form.module.css";

function Desciption({ mode, record, description, setDescription }) {
  return (
    <div className={styles.description}>
      <label htmlFor="description">Description: </label>
      {mode === "normal" && <p>{record.description}</p>}
      {mode === "update" && (
        <textarea
          id="description"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      )}
    </div>
  );
}

export default Desciption;
