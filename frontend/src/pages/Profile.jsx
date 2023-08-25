import { Outlet } from "react-router-dom";

import ProfileSiderbar from "../features/profile/ProfileSidebar";
import styles from "./Profile.module.css";

function Profile() {
  return (
    <main className={styles.container}>
      <ProfileSiderbar />
      <Outlet />
    </main>
  );
}

export default Profile;
