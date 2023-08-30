import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./ui/Layout";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Singup from "./pages/Singup";

import Map from "./pages/Map";
import MapRecordList from "./features/map/MapRecordList";
import MapRecord from "./features/map/MapRecord";
import AddMapRecord from "./features/map/AddMapRecord";

import Profile from "./pages/Profile";
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

          <Route path="map" element={<Map />}>
            <Route index element={<MapRecordList />} />
            <Route path="/map/:id" element={<MapRecord />} />
            <Route path="add" element={<AddMapRecord />} />
          </Route>

          <Route path="profile" element={<Profile />}>
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
