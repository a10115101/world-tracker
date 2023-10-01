import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import SwitchModeButtonSet from "./button/SwitchModeButtonSet";
import Information from "./information/Information";
import { getUser } from "src/services/apiUser";
import { getCurrentUser } from "src/utilities/localStorage";
import { backendPort } from "src/utilities/port";
import { formatDate } from "src/utilities/format";
import styles from "./ProfileFriendInfo.module.css";

function ProfileFriendInfo() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [mode, setMode] = useState("profile");
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [loadingError, setLoadingError] = useState("");
  const [lookupUserInfo, setLookupUserInfo] = useState({});

  const currentUserID = getCurrentUser().user._id;
  const lookupUserID = id;

  useEffect(function () {
    async function getLookupUserData() {
      try {
        if (currentUserID === lookupUserID) return navigate("/profile");

        setIsLoadingData(true);
        setLoadingError("");
        const data = await getUser(lookupUserID);
        setLookupUserInfo(data);
      } catch (err) {
        setLoadingError("Loading Data Error!");
      } finally {
        setIsLoadingData(false);
      }
    }
    getLookupUserData();
  }, []);

  if (isLoadingData) return <h2>Loading...</h2>;

  if (!lookupUserInfo.isPublic)
    return <h2>Oops! {lookupUserInfo.username} profile is not public</h2>;

  if (loadingError) return <h2>{loadingError}</h2>;

  return (
    <div className={styles.container}>
      <div className={styles.topContainer}>
        <img
          src={backendPort(`public/users/${lookupUserInfo?.photo}`)}
          crossOrigin="use-credentials"
          alt="pic"
        />
        <div>
          <h4>User Name: {lookupUserInfo?.username}</h4>
          <h4>Email Address: {lookupUserInfo?.email}</h4>
          <h4>Created At: {formatDate(lookupUserInfo?.createdAt)}</h4>
        </div>
      </div>

      <div className={styles.bottomContainer}>
        <SwitchModeButtonSet mode={mode} setMode={setMode} />
        <Information mode={mode} lookupUserInfo={lookupUserInfo} />
      </div>
    </div>
  );
}

export default ProfileFriendInfo;
