import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

import {
  getStatisCountries,
  getStatisContinents,
  recentlyVisited,
} from "../../services/apiRecord";
import styles from "./ProfileDetails.module.css";
import { formatDate } from "../../utilities/formatDate";

function ProfileDetails() {
  const [isLoadingStat, setIsLoadingStat] = useState(false);
  const [numVisitedCountries, setNumVisitedCountries] = useState(0);
  const [numPlanningCountries, setNumPlanningCountries] = useState(0);

  const [isLoadingPie, setIsLoadingPie] = useState(false);
  const [pieChartOptions, setPieChartOptions] = useState({
    datasets: [],
  });

  const [isLoadingRecently, setIsLoadingRecently] = useState(false);
  const [data, setData] = useState([]);

  useEffect(function () {
    async function getStat() {
      try {
        setIsLoadingStat(true);

        const response = await getStatisCountries();
        setNumVisitedCountries(response.data.data.visitedCountries.results);
        setNumPlanningCountries(response.data.data.planningCountries.results);
      } catch (err) {
        // handle later
        console.log(err.response.data);
      } finally {
        setIsLoadingStat(false);
      }
    }

    getStat();
  }, []);

  useEffect(function () {
    async function getPieData() {
      try {
        setIsLoadingPie(true);
        const response = await getStatisContinents();
        const pieData = response.data.data.statis;
        setPieChartOptions({
          labels: pieData.map((data) => data._id),
          datasets: [
            {
              label: "Users Visited",
              data: pieData.map((data) => data.num),
              backgroundColor: [
                "#fab1a0",
                "#ecf0f1",
                "#50AF95",
                "#f3ba2f",
                "#2a71d0",
                "#a29bfe",
              ],
              borderColor: "black",
              borderWidth: 2,
            },
          ],
        });
      } catch (err) {
        // handle later
        console.log(err.response.data);
      } finally {
        setIsLoadingPie(false);
      }
    }

    getPieData();
  }, []);

  useEffect(function () {
    async function getRecently() {
      try {
        setIsLoadingRecently(true);

        const data = await recentlyVisited();
        setData(data.informaiton);
      } catch (err) {
        // handle later
        console.log(err.response.data);
      } finally {
        setIsLoadingRecently(false);
      }
    }

    getRecently();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <div className={styles.topleftContainer}>
          <h2>Basic Statis</h2>
          <h4>
            Number of Visited Countries:
            {isLoadingStat ? " Loading data..." : ` ${numVisitedCountries}`}
          </h4>
          <h4>
            Number of Planning Countries:
            {isLoadingStat ? " Loading data..." : ` ${numPlanningCountries}`}
          </h4>
        </div>
        <div className={styles.bottomLeftContainer}>
          {isLoadingPie ? "Loading..." : <Doughnut data={pieChartOptions} />}
        </div>
      </div>

      <div className={styles.rightContainer}>
        <div className={styles.topRightContainer}>
          <h2>Latest Visited</h2>
        </div>

        {isLoadingRecently ? (
          "Loading"
        ) : (
          <div className={styles.bottomRightContainer}>
            <ul>
              {data.length > 0 ? (
                data.map((d) => (
                  <li key={d._id}>
                    <div>
                      <p>
                        {d.country} <span>({d.cityName})</span>
                      </p>
                      <p>
                        {formatDate(d.date)} <span>{d.rating}</span>
                      </p>
                    </div>
                  </li>
                ))
              ) : (
                <p>No Data</p>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileDetails;
