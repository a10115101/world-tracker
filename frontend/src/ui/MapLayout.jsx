import { Outlet } from "react-router-dom";

function MapLayout() {
  return (
    <div>
      <p>MapSidebar</p>
      <Outlet />
      <p>Map</p>
    </div>
  );
}

export default MapLayout;
