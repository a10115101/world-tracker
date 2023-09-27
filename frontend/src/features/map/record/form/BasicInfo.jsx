import Flag from "react-country-flag";

import styles from "./form.module.css";

function BasicInfo({ record }) {
  return (
    <div className={styles.basicInfo}>
      <Flag
        className={styles.flag}
        countryCode={record?.countryCode}
        fallback={<span>{record?.countryCode}</span>}
        svg
      />
      <div>
        <h2>{record?.country}</h2>
        <p>{record?.cityName}</p>
      </div>
    </div>
  );
}

export default BasicInfo;
