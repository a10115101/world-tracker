import { Link } from "react-router-dom";

import CancelFriendButton from "../button/CancelFriendButton";
import styles from "./list.module.css";

function AllFriendsList({ friends }) {
  return (
    <>
      {friends.length > 0 ? (
        friends.map((el) => (
          <div className={styles.container} key={el._id}>
            <div className={styles.leftContainer}>
              <Link
                to={`http://localhost:5173/profile/user/${el.recipient._id}`}
              >
                <img
                  src={`http://localhost:3000/public/users/${el.recipient.photo}`}
                  alt="photo"
                  width="75"
                />
                <h2>Name: {el.recipient.username}</h2>
                <h2>Status: {el.status}</h2>
              </Link>
            </div>

            <div className={styles.rightContainer}>
              <CancelFriendButton user={el} />
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
