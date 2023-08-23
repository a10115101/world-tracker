import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./ui/Layout";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Singup from "./pages/Singup";
import MapLayout from "./ui/MapLayout";
import MapRecords from "./features/map/MapRecords";
import MapRecord from "./features/map/MapRecord";
import AddMapRecord from "./features/map/AddMapRecord";
import ProfileLayout from "./ui/ProfileLayout";
import ProfileAbout from "./features/profile/ProfileAbout";
import ProfileDetails from "./features/profile/ProfileDetails";
import ProfileFriends from "./features/profile/ProfileFriends";
import ProfileSetting from "./features/profile/ProfileSetting";
import PageNotFound from "./pages/PageNotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Singup />} />

          <Route path="map" element={<MapLayout />}>
            <Route index element={<MapRecords />} />
            <Route path="map/:id" element={<MapRecord />} />
            <Route path="add" element={<AddMapRecord />} />
          </Route>

          <Route path="profile" element={<ProfileLayout />}>
            <Route index element={<ProfileAbout />} />
            <Route path="about" element={<ProfileAbout />} />
            <Route path="details" element={<ProfileDetails />} />
            <Route path="friends" element={<ProfileFriends />} />
            <Route path="setting" element={<ProfileSetting />} />
          </Route>

          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
