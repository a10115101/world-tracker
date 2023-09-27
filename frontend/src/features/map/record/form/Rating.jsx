import styles from "./form.module.css";

function Rating({ mode, record, rating, setRating, currentStatus }) {
  return (
    <>
      {mode === "normal" && record.status === "visited" && (
        <div className={styles.rating}>
          <h3 htmlFor="rating">Rating: </h3>
          <p>{record.rating}</p>
        </div>
      )}

      {mode === "update" && currentStatus === "visited" && (
        <div className={styles.rating}>
          <label htmlFor="rating">Rating: </label>
          <select
            id="rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
      )}
    </>
  );
}

export default Rating;
