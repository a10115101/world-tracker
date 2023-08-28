import styles from "./ProfileDetails.module.css";

function ProfileDetails() {
  return (
    <div className={styles.container}>
      <div className={styles.data}>
        <div>
          <span>
            <i className="fa-regular fa-flag" />
            Visited Countries Counts : 100
          </span>
        </div>
        <div>
          <span>
            <i className="fa-solid fa-city" />
            Visited Cities Counts : 100
          </span>
        </div>
      </div>

      <div className={styles.chart}>
        <div>
          <div>bar chart</div>
        </div>
        <div>
          <div>pie chart</div>
        </div>
      </div>
    </div>
  );
}

export default ProfileDetails;
