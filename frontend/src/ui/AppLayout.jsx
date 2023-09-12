import { Outlet } from "react-router-dom";
import { SnackbarProvider } from "notistack";

import AppNav from "./AppNav";
import AppFooter from "./AppFooter";
import styles from "./AppLayout.module.css";

function Layout() {
  return (
    <div className={styles.container}>
      <SnackbarProvider>
        <div className={styles.topContainer}>
          <AppNav />
        </div>
        <div className={styles.centerContainer}>
          <Outlet />
        </div>
        <div className={styles.bottomContainer}>
          <AppFooter />
        </div>
      </SnackbarProvider>
    </div>
  );
}

export default Layout;
