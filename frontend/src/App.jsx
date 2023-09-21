import { BrowserRouter, Routes, Route } from "react-router-dom";

import AppLayout from "./ui/AppLayout";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Singup from "./pages/Singup";
import Redirect from "./pages/Redirect";
import PageNotFound from "./pages/PageNotFound";
import ProtectedRoute from "./pages/ProtectedRoute";

import Map from "./pages/Map";
import MapRecordList from "./features/map/MapRecordList";
import MapRecord from "./features/map/MapRecord";
import MapRecordForm from "./features/map/MapRecordForm";

import Profile from "./pages/Profile";
import ProfileAbout from "./features/profile/about/ProfileAbout";
import ProfileStatis from "./features/profile/ProfileStatis";
import ProfileFriends from "./features/profile/friends/ProfileFriends";
import ProfileFriendsData from "./features/profile/ProfileFriendsData";

import { RecordsProvider } from "./contexts/RecordsContext";
import { SearchProvider } from "./contexts/SearchContext";
import { AuthProvider } from "./contexts/AuthContext";
import { FriendsProvider } from "./contexts/FriendsContext";

function App() {
  return (
    <AuthProvider>
      <RecordsProvider>
        <SearchProvider>
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
                      <Map />
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
                  <Route path="user/:id" element={<ProfileFriendsData />} />
                </Route>

                <Route path="*" element={<PageNotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </SearchProvider>
      </RecordsProvider>
    </AuthProvider>
  );
}

export default App;
