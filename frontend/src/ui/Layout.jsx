import { Outlet } from "react-router-dom";

import AppNav from "./AppNav";
import AppFooter from "./AppFooter";

function Layout() {
  return (
    <div>
      <AppNav />
      <Outlet />
      <AppFooter />
    </div>
  );
}

export default Layout;
