import { useEffect, useState } from "react";

import { formatDate } from "src/utilities/format";
import { getRecentlyVisited } from "src/services/apiRecord";
import styles from "./MilestoneList.module.css";

function MilestoneList({ userId }) {
  const [isLoadingListData, setIsLoadingListData] = useState(false);
  const [listError, setListError] = useState("");
  const [listData, setListData] = useState([]);

  useEffect(function () {
    async function getListData() {
      try {
        setIsLoadingListData(true);
        setListError("");

        const data = await getRecentlyVisited(userId);

        setListData(data.informaiton);
      } catch (err) {
        setListError("Loading List Data Error!");
      } finally {
        setIsLoadingListData(false);
      }
    }
    getListData();
  }, []);

  if (isLoadingListData) return <p>Loading...</p>;

  if (listError) return <p>{listError}</p>;

  return (
    <div className={styles.container}>
      <ul>
        {listData.length > 0 ? (
          listData.map((data) => (
            <li key={data._id}>
              <div>
                <h4>
                  Country: {data.country} <span>({data.cityName})</span>
                </h4>
                <h4>Date: {formatDate(data.date)} </h4>
                <h4>
                  Rating: {data.rating}{" "}
                  <span>
                    <i className="fa-solid fa-star" />
                  </span>
                </h4>
              </div>
            </li>
          ))
        ) : (
          <p>No Data</p>
        )}
      </ul>
    </div>
  );
}

export default MilestoneList;
