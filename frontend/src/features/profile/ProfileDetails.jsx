import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

import {
  getStatisCountries,
  getStatisContinents,
} from "../../services/apiRecord";
import styles from "./ProfileDetails.module.css";

function ProfileDetails() {
  const [isLoadingStat, setIsLoadingStat] = useState(false);
  const [numVisitedCountries, setNumVisitedCountries] = useState(0);
  const [numPlanningCountries, setNumPlanningCountries] = useState(0);

  const [isLoadingPie, setIsLoadingPie] = useState(false);
  const [pieChartOptions, setPieChartOptions] = useState({
    datasets: [],
  });

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
          <h2>Latest Activities</h2>
        </div>

        <div className={styles.bottomRightContainer}>
          <ul>
            <li>
              <div>
                <p>Canada</p>
                <p>2023/02/03</p>
              </div>
            </li>
            <li>
              <div>
                <p>Canada</p>
                <p>2023/02/03</p>
              </div>
            </li>
            <li>
              <div>
                <p>Canada</p>
                <p>2023/02/03</p>
              </div>
            </li>
            <li>
              <div>
                <p>Canada</p>
                <p>2023/02/03</p>
              </div>
            </li>
            <li>
              <div>
                <p>Canada</p>
                <p>2023/02/03</p>
              </div>
            </li>
            <li>
              <div>
                <p>Canada</p>
                <p>2023/02/03</p>
              </div>
            </li>
            <li>
              <div>
                <p>Canada</p>
                <p>2023/02/03</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ProfileDetails;
