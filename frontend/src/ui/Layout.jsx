import { Outlet } from "react-router-dom";

import AppNav from "./AppNav";
import AppFooter from "./AppFooter";
import styles from "./Layout.module.css";

function Layout() {
  return (
    <div className={styles.main}>
      <AppNav />
      <Outlet />
      <AppFooter />
    </div>
  );
}

export default Layout;
