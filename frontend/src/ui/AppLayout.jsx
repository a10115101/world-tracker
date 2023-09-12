import { Outlet } from "react-router-dom";

import AppNav from "./AppNav";
import AppFooter from "./AppFooter";
import styles from "./AppLayout.module.css";

function Layout() {
  return (
    <div className={styles.container}>
      <div className={styles.topContainer}>
        <AppNav />
      </div>
      <div className={styles.centerContainer}>
        <Outlet />
      </div>
      <div className={styles.bottomContainer}>
        <AppFooter />
      </div>
    </div>
  );
}

export default Layout;
