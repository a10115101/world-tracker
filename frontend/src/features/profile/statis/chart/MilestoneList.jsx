import { useEffect, useState } from "react";

import { formatDate } from "src/utilities/format";
import { getUser } from "src/services/apiAuth";
import { getRecentlyVisited } from "src/services/apiRecord";
import styles from "./MilestoneList.module.css";

function MilestoneList() {
  const [isLoadingListData, setIsLoadingListData] = useState(false);
  const [listError, setListError] = useState("");
  const [listData, setListData] = useState([]);

  const userInfo = getUser().user;

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

  if (isLoadingListData) return <p>Loading...</p>;

  if (listError) return <p>{listError}</p>;

  return (
    <div className={styles.container}>
      <ul>
        {listData.length > 0 ? (
          listData.map((data) => (
            <li key={data._id}>
              <div>
                <p>
                  {data.country} <span>({data.cityName})</span>
                </p>
                <p>
                  {formatDate(data.date)} <span>Rating: {data.rating}</span>
                </p>
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
