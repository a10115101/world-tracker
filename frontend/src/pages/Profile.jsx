import { Outlet } from "react-router-dom";

import ProfileSiderbar from "../features/profile/ProfileSidebar";
import styles from "./Profile.module.css";

function Profile() {
  return (
    <div className={styles.profile}>
      <ProfileSiderbar />
      <Outlet />
    </div>
  );
}

export default Profile;
