import BasicStatis from "./chart/BasicStatis";
import DoughnutChart from "./chart/DoughnutChart";
import MilestoneList from "./chart/MilestoneList";

import { getUser } from "src/services/apiAuth";
import styles from "./ProfileStatis.module.css";

function ProfileDetails() {
  const userInfo = getUser().user;

  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <div className={styles.topleftContainer}>
          <h2>Basic Statis</h2>
          <BasicStatis userId={userInfo._id} />
        </div>
        <div className={styles.bottomLeftContainer}>
          <h2>Number Of Visits By Continents</h2>
          <DoughnutChart userId={userInfo._id} />
        </div>
      </div>
      <div className={styles.rightContainer}>
        <h2>Latest Visited</h2>
        <MilestoneList userId={userInfo._id} />
      </div>
    </div>
  );
}

export default ProfileDetails;
