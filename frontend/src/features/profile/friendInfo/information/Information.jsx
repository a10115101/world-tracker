import BasicStatis from "src/features/profile/statis/chart/BasicStatis";
import DoughnutChart from "src/features/profile/statis/chart/DoughnutChart";
import MilestoneList from "src/features/profile/statis/chart/MilestoneList";
import { formatDate, formatLanguage } from "src/utilities/format";
import styles from "./Information.module.css";

function Information({ mode, lookupUserInfo }) {
  return (
    <div className={styles.container}>
      {mode === "profile" && (
        <>
          <div className={styles.profileContainer}>
            <div className={styles.profileField1Container}>
              <h2>Additional Information</h2>
              <div>
                <h4>Gender: {lookupUserInfo?.gender}</h4>
                <h4>Birthday: {formatDate(lookupUserInfo?.birthday)}</h4>
                <h4>Language: {formatLanguage(lookupUserInfo?.language)}</h4>
              </div>
            </div>
            <div className={styles.profileField2Container}>
              <h2>Introduction</h2>
              <div>
                <p>{lookupUserInfo?.introduction}</p>
              </div>
            </div>
          </div>
        </>
      )}

      {mode === "statis" && (
        <>
          <div className={styles.statisBasicContainer}>
            <h2>Basic Statis</h2>
            <BasicStatis userId={lookupUserInfo?._id} />
          </div>
          <div className={styles.statisFigureContainer}>
            <div className={styles.statisDoughnutContainer}>
              <h2>Number Of Visits By Continents</h2>
              <DoughnutChart userId={lookupUserInfo?._id} />
            </div>
            <div className={styles.statisListContainer}>
              <h2>Latest Visited</h2>
              <MilestoneList userId={lookupUserInfo?._id} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Information;
