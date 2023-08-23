import { Outlet } from "react-router-dom";

function ProfileLayout() {
  return (
    <div>
      <p>ProfileSidebar</p>
      <Outlet />
    </div>
  );
}

export default ProfileLayout;
