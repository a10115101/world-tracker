import BasicStatis from "./chart/BasicStatis";
import DoughnutChart from "./chart/DoughnutChart";
import MilestoneList from "./chart/MilestoneList";
import styles from "./ProfileStatis.module.css";

function ProfileDetails() {
  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <div className={styles.topleftContainer}>
          <h2>Basic Statis</h2>
          <BasicStatis />
        </div>
        <div className={styles.bottomLeftContainer}>
          <h2>Number of visits by continents</h2>
          <DoughnutChart />
        </div>
      </div>
      <div className={styles.rightContainer}>
        <div className={styles.topRightContainer}>
          <h2>Latest Visited</h2>
        </div>
        <MilestoneList />
      </div>
    </div>
  );
}

export default ProfileDetails;
