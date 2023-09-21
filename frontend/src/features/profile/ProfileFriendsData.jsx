import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

import {
  getRecentlyVisited,
  getStatisContinents,
  getStatisCountries,
} from "src/services/apiRecord";
import {
  doughnutDatasetSetting,
  doughnutLegendSetting,
} from "src/utilities/doughnutConfig";
import { getUser } from "src/services/apiUser";
import { formatDate, formatLanguage } from "src/utilities/format";
import MilestoneList from "./statis/chart/MilestoneList";
import styles from "./ProfileFriendsData.module.css";

function ProfileFriendsData() {
  const { id } = useParams();

  const [isLoadingData, setIsLoadingData] = useState(false);
  const [loadingError, setLoadingError] = useState("");
  const [userInfo, setUserInfo] = useState({});

  const [isLoadingStatisData, setIsLoadingStatisData] = useState(false);
  const [statisError, setStatisError] = useState("");
  const [numVisitedCountries, setNumVisitedCountries] = useState(0);
  const [numPlanningCountries, setNumPlanningCountries] = useState(0);

  const [isLoadingDoughnutData, setIsLoadingDoughnutData] = useState(false);
  const [doughnutError, setDoughnutError] = useState("");
  const [doughnutData, setDoughnutData] = useState({
    datasets: [],
  });

  const [isLoadingListData, setIsLoadingListData] = useState(false);
  const [listError, setListError] = useState("");
  const [listData, setListData] = useState([]);

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

  // Statis
  useEffect(function () {
    async function getStatis() {
      try {
        setIsLoadingStatisData(true);
        setStatisError("");
        const data = await getStatisCountries(id);
        setNumVisitedCountries(data.visitedCountries.results);
        setNumPlanningCountries(data.planningCountries.results);
      } catch (err) {
        setStatisError("Loading Statis Data Error!");
      } finally {
        setIsLoadingStatisData(false);
      }
    }
    getStatis();
  }, []);

  // Doughnut
  useEffect(function () {
    async function getPieData() {
      try {
        setIsLoadingDoughnutData(true);
        setDoughnutError("");
        const data = await getStatisContinents(id);
        setDoughnutData(doughnutDatasetSetting(data));
      } catch (err) {
        setDoughnutError("Loading Doughnut Data Error!");
      } finally {
        setIsLoadingDoughnutData(false);
      }
    }
    getPieData();
  }, []);

  // List
  useEffect(function () {
    async function getListData() {
      try {
        setIsLoadingListData(true);
        setListError("");
        const data = await getRecentlyVisited(id);
        setListData(data.informaiton);
      } catch (err) {
        setListError("Loading List Data Error!");
      } finally {
        setIsLoadingListData(false);
      }
    }
    getListData();
  }, []);

  if (!userInfo.isPublic)
    return <div>Oops! {userInfo.username} profile is not public</div>;

  return (
    <div className={styles.container}>
      <div className={styles.topContainer}>
        <div>
          <img
            src={`http://localhost:3000/public/users/${userInfo.photo}`}
            alt="pic"
            width="80"
          />
        </div>
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
          <button onClick={() => setMode("profile")}>Profile</button>
          <button onClick={() => setMode("statis")}>Statis</button>
        </div>

        <div className={styles.bottomPart2Container}>
          {mode === "profile" && (
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
          )}

          {mode === "statis" && (
            <>
              <div className={styles.statisBasicContainer}>
                <h2>Basic Statis</h2>
                {isLoadingStatisData && "Loading data..."}
                {!isLoadingStatisData && !statisError && (
                  <div>
                    <h4>Total of Countries Visited: {numVisitedCountries}</h4>
                    <h4>
                      Total of Planning to Visit Countries:{" "}
                      {numPlanningCountries}
                    </h4>
                  </div>
                )}
                {statisError && statisError}
              </div>

              <div className={styles.statisFigureContainer}>
                <div className={styles.statisDoughnutContainer}>
                  <h2>Basic Statis</h2>
                  {isLoadingDoughnutData && "Loading..."}
                  {!isLoadingDoughnutData && !doughnutError && (
                    <Doughnut
                      data={doughnutData}
                      options={doughnutLegendSetting()}
                    />
                  )}
                  {doughnutError && doughnutError}
                </div>

                <div className={styles.statisListContainer}>
                  <h2>Latest Visited</h2>
                  {isLoadingListData && "Loading..."}
                  {!isLoadingListData && !listError && (
                    <MilestoneList listData={listData} />
                  )}
                  {listError && listError}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfileFriendsData;
