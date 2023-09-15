import { formatDate } from "../../utilities/formatDate";
import styles from "./ProfileStatisList.module.css";

function ProfileStatisList({ listData }) {
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

export default ProfileStatisList;
