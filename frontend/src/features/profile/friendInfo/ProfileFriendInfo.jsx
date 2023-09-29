import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import BasicStatis from "../statis/chart/BasicStatis";
import DoughnutChart from "../statis/chart/DoughnutChart";
import MilestoneList from "../statis/chart/MilestoneList";

import { getCurrentUser } from "src/services/apiAuth";
import { getUser } from "src/services/apiUser";
import { backendPort } from "src/utilities/port";
import { formatDate, formatLanguage } from "src/utilities/format";
import styles from "./ProfileFriendInfo.module.css";

function ProfileFriendInfo() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [mode, setMode] = useState("profile");
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [loadingError, setLoadingError] = useState("");
  const [userInfo, setUserInfo] = useState({});

  const currentUserID = getCurrentUser().user._id;
  const lookupUserID = id;

  useEffect(function () {
    async function getUserData() {
      try {
        if (currentUserID === lookupUserID) return navigate("/profile");

        setIsLoadingData(true);
        setLoadingError("");

        const data = await getUser(lookupUserID);
        setUserInfo(data);
      } catch (err) {
        setLoadingError("Loading Data Error!");
      } finally {
        setIsLoadingData(false);
      }
    }
    getUserData();
  }, []);

  if (isLoadingData) return <h2>Loading...</h2>;

  if (!userInfo.isPublic)
    return <h2>Oops! {userInfo.username} profile is not public</h2>;

  if (loadingError) return <h2>{loadingError}</h2>;

  return (
    <div className={styles.container}>
      <div className={styles.topContainer}>
        <img
          src={backendPort(`public/users/${userInfo?.photo}`)}
          alt="pic"
          width="80"
        />
        <div>
          <h4>User Name: {userInfo?.username}</h4>
          <h4>Email Address: {userInfo?.email}</h4>
          <h4>
            Created At: {userInfo?.createdAt && formatDate(userInfo?.createdAt)}
          </h4>
        </div>
      </div>

      <div className={styles.bottomContainer}>
        <div className={styles.bottomPart1Container}>
          <button
            className={mode === "profile" ? `${styles.btnFocus}` : ""}
            onClick={() => setMode("profile")}
          >
            Profile
          </button>
          <button
            className={mode === "statis" ? `${styles.btnFocus}` : ""}
            onClick={() => setMode("statis")}
          >
            Statis
          </button>
        </div>

        <div className={styles.bottomPart2Container}>
          {mode === "profile" && (
            <>
              <div className={styles.profileContainer}>
                <div className={styles.profileField1Container}>
                  <h2>Additional Information</h2>
                  <div>
                    <h4>Gender: {userInfo?.gender}</h4>
                    <h4>Birthday: {formatDate(userInfo?.birthday)}</h4>
                    <h4>Language: {formatLanguage(userInfo?.language)}</h4>
                  </div>
                </div>
                <div className={styles.profileField2Container}>
                  <h2>Introduction</h2>
                  <div>
                    <p>{userInfo?.introduction}</p>
                  </div>
                </div>
              </div>
            </>
          )}

          {mode === "statis" && (
            <>
              <div className={styles.statisBasicContainer}>
                <h2>Basic Statis</h2>
                <BasicStatis userId={lookupUserID} />
              </div>
              <div className={styles.statisFigureContainer}>
                <div className={styles.statisDoughnutContainer}>
                  <h2>Number Of Visits By Continents</h2>
                  <DoughnutChart userId={lookupUserID} />
                </div>
                <div className={styles.statisListContainer}>
                  <h2>Latest Visited</h2>
                  <MilestoneList userId={lookupUserID} />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfileFriendInfo;
