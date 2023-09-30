import { useEffect, useState } from "react";

import { getStatisCountries } from "src/services/apiRecord";
import styles from "./BasicStatis.module.css";

function BasicStatis({ userId }) {
  const [isOpened, setIsOpened] = useState(false);
  const [isLoadingStatisData, setIsLoadingStatisData] = useState(false);
  const [statisError, setStatisError] = useState("");
  const [numVisitedCountries, setNumVisitedCountries] = useState(0);
  const [numPlanningCountries, setNumPlanningCountries] = useState(0);

  useEffect(function () {
    async function getStatis() {
      try {
        setIsLoadingStatisData(true);
        setStatisError("");
        const data = await getStatisCountries(userId);
        setNumVisitedCountries(data.visitedCountries);
        setNumPlanningCountries(data.planningCountries);
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
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <h4>Total of Countries Visited: {numVisitedCountries?.results}</h4>
        <h4>
          Total of Planning to Visit Countries: {numPlanningCountries?.results}
        </h4>
      </div>

      <div className={styles.rightContainer}>
        <button onClick={() => setIsOpened(!isOpened)}>
          {isOpened ? (
            <>
              Close <i className="fa-solid fa-angle-up" />
            </>
          ) : (
            <>
              Open <i className="fa-solid fa-angle-down" />
            </>
          )}
        </button>

        {isOpened && (
          <div>
            <h4 className={styles.visited}>Visited: </h4>
            {numVisitedCountries?.countryName?.length > 0 ? (
              numVisitedCountries?.countryName.map((country) => (
                <p key={country._id}>{country._id}</p>
              ))
            ) : (
              <p>None</p>
            )}

            <h4 className={styles.planning}>Planning: </h4>
            {numPlanningCountries?.countryName?.length > 0 ? (
              numPlanningCountries?.countryName.map((country) => (
                <p key={country._id}>{country._id}</p>
              ))
            ) : (
              <p>None</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default BasicStatis;
