import { Link } from "react-router-dom";

import ButtonSet from "../button/ButtonSet";
import { backendPort, frontendPort } from "src/utilities/port";
import { formatFriendship } from "src/utilities/format";
import styles from "./list.module.css";

function PendingFriendsList({ pending }) {
  return (
    <>
      {pending.length > 0 ? (
        pending.map((el) => (
          <div className={styles.container} key={el._id}>
            <div className={styles.leftContainer}>
              <Link to={frontendPort(`profile/user/${el.recipient._id}`)}>
                <img
                  src={backendPort(`public/users/${el.recipient.photo}`)}
                  alt="photo"
                />
                <h2>Name: {el.recipient.username}</h2>
                <h2>Status: {formatFriendship(el.status)}</h2>
              </Link>
            </div>
            <div className={styles.rightContainer}>
              <ButtonSet el={el} />
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
