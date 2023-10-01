import { Link } from "react-router-dom";

import PendingButtonSet from "../button/PendingButtonSet";
import { backendPort, frontendPort } from "src/utilities/port";
import { formatFriendship } from "src/utilities/format";
import styles from "./list.module.css";

function PendingFriendsList({ pending, isLoading, loadingError }) {
  if (isLoading) return <h3>Loading...</h3>;

  if (loadingError) return <h3>{loadingError}</h3>;

  return (
    <>
      {pending.length > 0 ? (
        pending.map((el) => (
          <div className={styles.container} key={el._id}>
            <div className={styles.leftContainer}>
              <Link to={frontendPort(`profile/user/${el.recipient._id}`)}>
                <img
                  src={backendPort(`public/users/${el.recipient.photo}`)}
                  crossOrigin="use-credentials"
                  alt="photo"
                />
                <div>
                  <h4>Name: </h4>
                  <h2>{el.recipient.username}</h2>
                </div>
                <div>
                  <h4>Status: </h4>
                  <h2>{formatFriendship(el.status)}</h2>
                </div>
              </Link>
            </div>
            <div className={styles.rightContainer}>
              <PendingButtonSet el={el} />
            </div>
          </div>
        ))
      ) : (
        <h3>No Data!</h3>
      )}
    </>
  );
}

export default PendingFriendsList;
