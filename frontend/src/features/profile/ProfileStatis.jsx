import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

import {
  getStatisCountries,
  getStatisContinents,
  getRecentlyVisited,
} from "../../services/apiRecord";
import {
  doughnutDatasetSetting,
  doughnutLegendSetting,
} from "../../utilities/doughnutConfig";
import { getUser } from "../../services/apiAuth";
import ProfileStatisList from "./ProfileStatisList";
import styles from "./ProfileStatis.module.css";

function ProfileDetails() {
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

  const userInfo = getUser().user;

  // Statis
  useEffect(function () {
    async function getStatis() {
      try {
        setIsLoadingStatisData(true);
        setStatisError("");
        const data = await getStatisCountries(userInfo._id);
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
        const data = await getStatisContinents(userInfo._id);
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
        const data = await getRecentlyVisited(userInfo._id);
        setListData(data.informaiton);
      } catch (err) {
        setListError("Loading List Data Error!");
      } finally {
        setIsLoadingListData(false);
      }
    }
    getListData();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <div className={styles.topleftContainer}>
          <h2>Basic Statis</h2>
          {isLoadingStatisData && "Loading data..."}
          {!isLoadingStatisData && !statisError && (
            <div>
              <h4>Total of Countries Visited: {numVisitedCountries}</h4>
              <h4>
                Total of Planning to Visit Countries: {numPlanningCountries}
              </h4>
            </div>
          )}
          {statisError && statisError}
        </div>
        <div className={styles.bottomLeftContainer}>
          <h2>Basic Statis</h2>
          {isLoadingDoughnutData && "Loading..."}
          {!isLoadingDoughnutData && !doughnutError && (
            <div>
              <Doughnut data={doughnutData} options={doughnutLegendSetting()} />
            </div>
          )}
          {doughnutError && doughnutError}
        </div>
      </div>

      <div className={styles.rightContainer}>
        <div className={styles.topRightContainer}>
          <h2>Latest Visited</h2>
        </div>
        {isLoadingListData && "Loading..."}
        {!isLoadingListData && !listError && (
          <div className={styles.bottomRightContainer}>
            <ProfileStatisList listData={listData} />
          </div>
        )}
        {listError && listError}
      </div>
    </div>
  );
}

export default ProfileDetails;
