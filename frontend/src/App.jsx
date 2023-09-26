import { BrowserRouter, Routes, Route } from "react-router-dom";

import AppLayout from "./ui/AppLayout";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Singup from "./pages/Singup";
import Redirect from "./pages/Redirect";
import PageNotFound from "./pages/PageNotFound";
import ProtectedRoute from "./pages/ProtectedRoute";

import Map from "./pages/Map";
import MapRecordList from "./features/map/record/list/MapRecordList";
import MapRecord from "./features/map/record/MapRecord";
import MapRecordForm from "./features/map/record/MapRecordForm";

import Profile from "./pages/Profile";
import ProfileAbout from "./features/profile/about/ProfileAbout";
import ProfileStatis from "./features/profile/statis/ProfileStatis";
import ProfileFriends from "./features/profile/friends/ProfileFriends";
import ProfileFriendInfo from "./features/profile/friendInfo/ProfileFriendInfo";

import { AuthProvider } from "./contexts/AuthContext";
import { MapPositionProvider } from "./contexts/MapPositionContext";
import { MapSearchProvider } from "./contexts/MapSearchContext";
import { RecordFormProvider } from "./contexts/RecordFormContext";
import { RecordsProvider } from "./contexts/RecordsContext";
import { FriendsProvider } from "./contexts/FriendsContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Homepage />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Singup />} />
            <Route path="redirect" element={<Redirect />} />

            <Route
              path="map"
              element={
                <ProtectedRoute>
                  <RecordsProvider>
                    <RecordFormProvider>
                      <MapPositionProvider>
                        <MapSearchProvider>
                          <Map />
                        </MapSearchProvider>
                      </MapPositionProvider>
                    </RecordFormProvider>
                  </RecordsProvider>
                </ProtectedRoute>
              }
            >
              <Route index element={<MapRecordList />} />
              <Route path="/map/:id" element={<MapRecord />} />
              <Route path="form" element={<MapRecordForm />} />
            </Route>

            <Route
              path="profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            >
              <Route index element={<ProfileAbout />} />
              <Route path="about" element={<ProfileAbout />} />
              <Route path="statis" element={<ProfileStatis />} />
              <Route
                path="friends"
                element={
                  <FriendsProvider>
                    <ProfileFriends />
                  </FriendsProvider>
                }
              />
              <Route path="user/:id" element={<ProfileFriendInfo />} />
            </Route>

            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
