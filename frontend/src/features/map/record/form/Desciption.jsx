import styles from "./form.module.css";

function Desciption({ mode, record, description, setDescription }) {
  return (
    <>
      {mode === "normal" && (
        <div className={styles.description}>
          <h3 htmlFor="description">Description: </h3>
          <p>{record.description}</p>
        </div>
      )}

      {mode === "update" && (
        <div className={styles.description}>
          <label htmlFor="description">Description: </label>
          <textarea
            id="description"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      )}
    </>
  );
}

export default Desciption;
