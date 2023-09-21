import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

import {
  doughnutDatasetSetting,
  doughnutLegendSetting,
} from "src/utilities/doughnutConfig";
import { getUser } from "src/services/apiAuth";
import { getStatisContinents } from "src/services/apiRecord";

function DoughnutChart() {
  const [isLoadingDoughnutData, setIsLoadingDoughnutData] = useState(false);
  const [doughnutError, setDoughnutError] = useState("");
  const [doughnutData, setDoughnutData] = useState({ datasets: [] });

  const userInfo = getUser().user;

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

  if (isLoadingDoughnutData) return <p>Loading...</p>;

  if (doughnutError) return <p>{doughnutError}</p>;

  return (
    <div>
      {doughnutData.datasets[0]?.data.length > 0 ? (
        <Doughnut data={doughnutData} options={doughnutLegendSetting()} />
      ) : (
        <p>No Data</p>
      )}
    </div>
  );
}

export default DoughnutChart;
