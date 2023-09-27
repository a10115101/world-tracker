import styles from "./form.module.css";

function Flag({ record }) {
  return (
    <div className={styles.flag}>
      <img
        src={
          record.countryCode &&
          `https://flagcdn.com/w80/${record.countryCode}.png`
        }
        width="80"
        alt="flag"
      />
      <div>
        <h2>{record.country}</h2>
        <p>({record.cityName})</p>
      </div>
    </div>
  );
}

export default Flag;
