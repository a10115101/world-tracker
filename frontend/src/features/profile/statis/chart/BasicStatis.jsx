import { useEffect, useState } from "react";

import { getUser } from "src/services/apiAuth";
import { getStatisCountries } from "src/services/apiRecord";

function BasicStatis() {
  const [isLoadingStatisData, setIsLoadingStatisData] = useState(false);
  const [statisError, setStatisError] = useState("");
  const [numVisitedCountries, setNumVisitedCountries] = useState(0);
  const [numPlanningCountries, setNumPlanningCountries] = useState(0);

  const userInfo = getUser().user;

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

  if (isLoadingStatisData) return <p>Loading data...</p>;

  if (statisError) return <p>{statisError}</p>;

  return (
    <div>
      <h4>Total of Countries Visited: {numVisitedCountries}</h4>
      <h4>Total of Planning to Visit Countries: {numPlanningCountries}</h4>
    </div>
  );
}

export default BasicStatis;
