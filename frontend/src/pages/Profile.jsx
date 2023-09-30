import { Outlet } from "react-router-dom";

import ProfileSiderbar from "src/features/profile/ProfileSidebar";
import styles from "./Profile.module.css";

function Profile() {
  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <ProfileSiderbar />
      </div>
      <div className={styles.rightContainer}>
        <Outlet />
      </div>
    </div>
  );
}

export default Profile;
