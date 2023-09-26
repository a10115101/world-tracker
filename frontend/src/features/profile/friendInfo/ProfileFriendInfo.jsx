import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import BasicStatis from "../statis/chart/BasicStatis";
import DoughnutChart from "../statis/chart/DoughnutChart";
import MilestoneList from "../statis/chart/MilestoneList";

import { getUser } from "src/services/apiUser";
import { formatDate, formatLanguage } from "src/utilities/format";
import styles from "./ProfileFriendInfo.module.css";

function ProfileFriendInfo() {
  const { id } = useParams();

  const [isLoadingData, setIsLoadingData] = useState(false);
  const [loadingError, setLoadingError] = useState("");
  const [userInfo, setUserInfo] = useState({});

  const [mode, setMode] = useState("profile");

  useEffect(function () {
    async function getUserData() {
      try {
        setIsLoadingData(true);
        setLoadingError("");

        const data = await getUser(id);

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
          src={`http://localhost:3000/public/users/${userInfo.photo}`}
          alt="pic"
          width="80"
        />
        <div>
          <h4>User Name: {userInfo.username && userInfo.username}</h4>
          <h4>Email Address: {userInfo.email && userInfo.email}</h4>
          <h4>
            Created At: {userInfo.createdAt && formatDate(userInfo.createdAt)}
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
                    <h4>Gender: {userInfo.gender && userInfo.gender}</h4>
                    <h4>
                      Birthday:{" "}
                      {userInfo.birthday && formatDate(userInfo.birthday)}
                    </h4>
                    <h4>
                      Language:{" "}
                      {userInfo.language && formatLanguage(userInfo.language)}
                    </h4>
                  </div>
                </div>
                <div className={styles.profileField2Container}>
                  <h2>Introduction</h2>
                  <div>
                    <p>{userInfo.introduction && userInfo.introduction}</p>
                  </div>
                </div>
              </div>
            </>
          )}

          {mode === "statis" && (
            <>
              <div className={styles.statisBasicContainer}>
                <h2>Basic Statis</h2>
                <BasicStatis userId={id} />
              </div>
              <div className={styles.statisFigureContainer}>
                <div className={styles.statisDoughnutContainer}>
                  <h2>Number Of Visits By Continents</h2>
                  <DoughnutChart userId={id} />
                </div>
                <div className={styles.statisListContainer}>
                  <h2>Latest Visited</h2>
                  <MilestoneList userId={id} />
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
