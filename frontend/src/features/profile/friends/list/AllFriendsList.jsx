import { Link } from "react-router-dom";

import CancelFriendButton from "../button/CancelFriendButton";
import { backendPort, frontendPort } from "src/utilities/port";
import { formatFriendship } from "src/utilities/format";
import styles from "./list.module.css";

function AllFriendsList({ friends }) {
  return (
    <>
      {friends.length > 0 ? (
        friends.map((el) => (
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
              <CancelFriendButton user={el}>
                {el.status === 1 ? "Cancel" : "Remove"}
              </CancelFriendButton>
            </div>
          </div>
        ))
      ) : (
        <h3>No Friends!</h3>
      )}
    </>
  );
}

export default AllFriendsList;
